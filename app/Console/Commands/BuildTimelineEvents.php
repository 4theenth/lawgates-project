<?php

namespace App\Console\Commands;

use App\Models\Peraturan;
use App\Models\TimelineEvent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Membangun ulang tabel `timeline_events` dari tabel master `peraturan` (REG-04).
 *
 * Dipisahkan dari alur CRUD supaya penulisan peraturan tidak ikut melambat, dan
 * supaya event bisa dibangun ulang penuh kapan pun data tanggal di master
 * diperbaiki (dua kolom tanggalnya masih banyak yang kosong).
 *
 * Idempoten: memakai upsert pada unique (regulation_id, event_type, event_date),
 * jadi dijalankan berulang aman.
 */
class BuildTimelineEvents extends Command
{
    protected $signature = 'timeline:build';

    protected $description = 'Bangun ulang tabel timeline_events dari data peraturan';

    public function handle(): int
    {
        // Event hanya bisa dibuat kalau tanggalnya ada. Satu peraturan bisa
        // punya salah satu tanggal saja, jadi keduanya diperiksa terpisah.
        $peraturans = Peraturan::query()
            ->with(['jenisPeraturan:id,kode,nama', 'statusPeraturan:id,nama_status'])
            ->get(['id', 'unique_id', 'jenis_peraturan_id', 'status_id', 'tanggal_penetapan', 'tanggal_pengundangan', 'instansi', 'subjek', 'lokasi_daerah']);

        $rows = [];

        foreach ($peraturans as $peraturan) {
            $type = $this->regulationType($peraturan->jenisPeraturan?->kode, $peraturan->jenisPeraturan?->nama);

            // AC timeline memakai "terbit" dan "dicabut". Status master hanya
            // membedakan Berlaku / Tidak Berlaku, jadi "Tidak Berlaku" dipetakan
            // ke "dicabut".
            $eventType = $this->isBerlaku($peraturan->statusPeraturan?->nama_status)
                ? TimelineEvent::TYPE_TERBIT
                : TimelineEvent::TYPE_DICABUT;

            // Tanggal penetapan dipakai sebagai tanggal peristiwa; kalau kosong
            // jatuh ke tanggal pengundangan.
            $eventDate = $peraturan->tanggal_penetapan ?? $peraturan->tanggal_pengundangan;

            if (! $eventDate) {
                continue;
            }

            $rows[] = [
                'regulation_id' => $peraturan->id,
                'regulation_unique_id' => $peraturan->unique_id,
                'event_type' => $eventType,
                'event_date' => $eventDate->toDateString(),
                'regulation_type' => $type,
                'instansi' => $peraturan->instansi,
                'subjek' => $peraturan->subjek,
                'lokasi_daerah' => $peraturan->lokasi_daerah,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if ($rows === []) {
            $this->warn('Tidak ada peraturan dengan tanggal penetapan/pengundangan.');

            return self::SUCCESS;
        }

        // Baris identik dari beberapa peraturan tidak boleh saling menimpa, jadi
        // upsert dikelompokkan: unique-nya (regulation_id, event_type, event_date).
        foreach (array_chunk($rows, 500) as $chunk) {
            DB::table('timeline_events')->upsert(
                $chunk,
                ['regulation_id', 'event_type', 'event_date'],
                ['regulation_unique_id', 'regulation_type', 'instansi', 'subjek', 'lokasi_daerah', 'updated_at']
            );
        }

        $this->info('Timeline events dibangun: '.count($rows).' baris dari '.$peraturans->count().' peraturan.');

        return self::SUCCESS;
    }

    /**
     * Status master hanya punya "Berlaku" dan "Tidak Berlaku". Yang mengandung
     * "tidak" dianggap tidak berlaku; sisanya (termasuk "berlaku" huruf kecil
     * pada baris id 3) dianggap berlaku.
     */
    private function isBerlaku(?string $namaStatus): bool
    {
        return $namaStatus !== null
            && ! str_contains(mb_strtolower($namaStatus), 'tidak');
    }

    /**
     * `kode` dipakai kalau ada karena lebih pendek; kalau tidak, `nama`
     * diturunkan jadi huruf besar semua ("Peraturan Daerah" -> "PERATURAN DAERAH").
     */
    private function regulationType(?string $kode, ?string $nama): string
    {
        if ($kode) {
            return mb_strtoupper($kode);
        }

        return $nama ? mb_strtoupper($nama) : 'LAINNYA';
    }
}
