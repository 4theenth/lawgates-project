<?php

namespace App\Http\Controllers;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegulasiController extends Controller
{
    /**
     * Display the Regulasi intelligence & exploration page.
     */
    public function index(Request $request): Response
    {
        // 1. Hitung jumlah peraturan per hierarki kategori (sinkron dengan Landing Page)
        $categoryCounts = [
            'uud'                  => 0,
            'tap-mpr'              => 0,
            'undang-undang'        => 0,
            'uu-perpu'             => 0,
            'peraturan-pemerintah' => 0,
            'pp'                   => 0,
            'perpres'              => 0,
            'peraturan-presiden'   => 0,
            'perda'                => 0,
            'peraturan-daerah'     => 0,
            'permen-perban'        => 0,
            'putusan-mk-ma'        => 0,
        ];

        $categoryLatestDates = [
            'uud'                  => null,
            'tap-mpr'              => null,
            'undang-undang'        => null,
            'uu-perpu'             => null,
            'peraturan-pemerintah' => null,
            'pp'                   => null,
            'perpres'              => null,
            'peraturan-presiden'   => null,
            'perda'                => null,
            'peraturan-daerah'     => null,
            'permen-perban'        => null,
            'putusan-mk-ma'        => null,
        ];

        $statsPerJenis = Peraturan::selectRaw('jenis_peraturan_id, count(*) as total, max(updated_at) as latest_update, max(created_at) as latest_create')
            ->groupBy('jenis_peraturan_id')
            ->get()
            ->keyBy('jenis_peraturan_id');

        $allJenis = JenisPeraturan::all();
        foreach ($allJenis as $jenis) {
            $row = $statsPerJenis[$jenis->id] ?? null;
            $total = (int) ($row->total ?? 0);
            $latest = $row ? ($row->latest_update ?? $row->latest_create) : null;
            $kode = strtolower($jenis->kode ?? '');
            $nama = strtolower($jenis->nama ?? '');

            $updateLatest = function ($slug) use (&$categoryLatestDates, $latest) {
                if ($latest && (!$categoryLatestDates[$slug] || $latest > $categoryLatestDates[$slug])) {
                    $categoryLatestDates[$slug] = (string) $latest;
                }
            };

            if (str_contains($nama, 'dasar') || $kode === 'uud') {
                $categoryCounts['uud'] += $total;
                $updateLatest('uud');
            } elseif (str_contains($nama, 'mpr') || str_contains($kode, 'mpr')) {
                $categoryCounts['tap-mpr'] += $total;
                $updateLatest('tap-mpr');
            } elseif (str_contains($nama, 'undang') || $kode === 'uu' || str_contains($nama, 'perpu')) {
                $categoryCounts['undang-undang'] += $total;
                $categoryCounts['uu-perpu'] += $total;
                $updateLatest('undang-undang');
                $updateLatest('uu-perpu');
            } elseif (str_contains($nama, 'pemerintah') || $kode === 'pp') {
                $categoryCounts['peraturan-pemerintah'] += $total;
                $categoryCounts['pp'] += $total;
                $updateLatest('peraturan-pemerintah');
                $updateLatest('pp');
            } elseif (str_contains($nama, 'presiden') || $kode === 'perpres') {
                $categoryCounts['peraturan-presiden'] += $total;
                $categoryCounts['perpres'] += $total;
                $updateLatest('peraturan-presiden');
                $updateLatest('perpres');
            } elseif (str_contains($nama, 'daerah') || $kode === 'perda') {
                $categoryCounts['peraturan-daerah'] += $total;
                $categoryCounts['perda'] += $total;
                $updateLatest('peraturan-daerah');
                $updateLatest('perda');
            } elseif (str_contains($nama, 'menteri') || str_contains($nama, 'lembaga') || str_contains($nama, 'badan') || str_contains($kode, 'permen')) {
                $categoryCounts['permen-perban'] += $total;
                $updateLatest('permen-perban');
            } elseif (str_contains($nama, 'putusan') || str_contains($nama, 'mahkamah') || str_contains($kode, 'mk') || str_contains($kode, 'ma')) {
                $categoryCounts['putusan-mk-ma'] += $total;
                $updateLatest('putusan-mk-ma');
            }
        }

        // 2. Statistik status keberlakuan
        $statusCounts = Peraturan::selectRaw('status_id, count(*) as total')
            ->groupBy('status_id')
            ->pluck('total', 'status_id');

        $allStatus = Status::all();
        $berlaku = 0;
        $tidakBerlaku = 0;
        $diubah = 0;
        $dicabut = 0;

        foreach ($allStatus as $st) {
            $c = (int) ($statusCounts[$st->id] ?? 0);
            $stNama = strtolower($st->nama_status ?? '');
            if (str_contains($stNama, 'tidak')) {
                $tidakBerlaku += $c;
            } elseif (str_contains($stNama, 'berlaku')) {
                $berlaku += $c;
            } elseif (str_contains($stNama, 'ubah')) {
                $diubah += $c;
            } elseif (str_contains($stNama, 'cabut')) {
                $dicabut += $c;
            }
        }

        $totalPeraturan = Peraturan::count();

        // 3. Referensi Filter untuk Dropdown Kategori & Status
        $kategoriList = JenisPeraturan::whereIn('id', Peraturan::select('jenis_peraturan_id')->distinct())
            ->get()
            ->groupBy('nama')
            ->map(function ($items, $nama) {
                return [
                    'id'   => $items->pluck('id')->join(','),
                    'nama' => $nama,
                ];
            })->values();

        $statusList = Status::whereIn('id', Peraturan::select('status_id')->distinct())
            ->get()
            ->groupBy('nama_status')
            ->map(function ($items, $nama) {
                return [
                    'id'   => $items->pluck('id')->join(','),
                    'nama' => $nama,
                ];
            })->values();

        $tahunList = Peraturan::select('tahun')
            ->whereNotNull('tahun')
            ->distinct()
            ->orderBy('tahun', 'desc')
            ->pluck('tahun');

        return Inertia::render('Regulasi', [
            'categoryCounts'      => $categoryCounts,
            'categoryLatestDates' => $categoryLatestDates,
            'dailyStats'          => [
                'total'         => $totalPeraturan ?: 1492,
                'berlaku'       => $berlaku ?: 1292,
                'tidak_berlaku' => $tidakBerlaku ?: 200,
                'diubah'        => $diubah ?: 1344,
                'dicabut'       => $dicabut ?: 87,
            ],
            'heroStats'      => [
                'berlaku'       => 3769083,
                'tidak_berlaku' => 129000,
                'diubah'        => 278000,
                'dicabut'       => 12000,
            ],
            'filterReferences' => [
                'kategori' => $kategoriList,
                'status'   => $statusList,
                'tahun'    => $tahunList,
            ],
        ]);
    }
}
