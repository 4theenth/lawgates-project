<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PeraturanOverwriteLog extends Model
{
    protected $table = 'peraturan_overwrite_logs';

    protected $fillable = [
        'peraturan_id',
        'unique_id',
        'user_id',
        'source',
        'snapshot',
        'changes',
        'chunks_before',
        'chunks_after',
        'snapshot_purged_at',
    ];

    protected $casts = [
        'snapshot' => 'array',
        'changes' => 'array',
        'snapshot_purged_at' => 'datetime',
        'chunks_before' => 'integer',
        'chunks_after' => 'integer',
    ];

    public function peraturan(): BelongsTo
    {
        return $this->belongsTo(Peraturan::class, 'peraturan_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Kolom peraturan yang ikut dicatat dalam snapshot.
     * Kolom teknis (id, timestamps) sengaja dilewati.
     */
    public static function snapshotColumns(): array
    {
        return [
            'unique_id',
            'judul',
            'jenis_peraturan_id',
            'status_id',
            'nomor',
            'tahun',
            'tempat_penetapan',
            'tanggal_penetapan',
            'tanggal_pengundangan',
            'tanggal_berlaku',
            'instansi',
            'lokasi_daerah',
            'url_pdf',
            'subjek',
            'file_pdf_path',
            'created_by',
            'updated_by',
        ];
    }

    /**
     * Ringkasan perubahan antar dua kondisi.
     *
     * @return array{before: array, after: array, fields: array<int,string>, dropped_fields: array<int,string>}
     */
    public static function diffFields(array $before, array $after): array
    {
        $fields = [];
        $dropped = [];

        foreach ($after as $key => $value) {
            $old = $before[$key] ?? null;

            if (static::normalize($old) === static::normalize($value)) {
                continue;
            }

            $fields[] = $key;

            // Field yang tadinya berisi lalu menjadi kosong: ini yang paling
            // berbahaya saat overwrite karena JSON baru lebih miskin dari lama.
            if (static::normalize($old) !== null && static::normalize($value) === null) {
                $dropped[] = $key;
            }
        }

        return [
            'before' => $before,
            'after' => $after,
            'fields' => $fields,
            'dropped_fields' => $dropped,
        ];
    }

    private static function normalize($value): ?string
    {
        if ($value === null) {
            return null;
        }

        if (is_string($value)) {
            $trimmed = trim($value);

            return $trimmed === '' ? null : $trimmed;
        }

        return (string) $value;
    }
}
