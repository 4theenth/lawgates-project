<?php

namespace App\Http\Controllers;

use App\Models\JenisPeraturan;
use App\Models\Peraturan;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the application landing page.
     */
    public function index(): Response
    {
        // Hitung jumlah data peraturan per kategori secara dinamis dari database admin
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

        $countsPerJenis = Peraturan::available()
            ->selectRaw('jenis_peraturan_id, count(*) as total')
            ->groupBy('jenis_peraturan_id')
            ->pluck('total', 'jenis_peraturan_id');

        $allJenis = JenisPeraturan::all();
        foreach ($allJenis as $jenis) {
            $total = (int) ($countsPerJenis[$jenis->id] ?? 0);
            $kode = strtolower($jenis->kode ?? '');
            $nama = strtolower($jenis->nama ?? '');

            if (str_contains($nama, 'dasar') || $kode === 'uud') {
                $categoryCounts['uud'] += $total;
            } elseif (str_contains($nama, 'mpr') || str_contains($kode, 'mpr')) {
                $categoryCounts['tap-mpr'] += $total;
            } elseif (str_contains($nama, 'daerah') || str_contains($nama, 'perda') || str_contains($kode, 'daerah') || $kode === 'perda' || $kode === 'p') {
                $categoryCounts['peraturan-daerah'] += $total;
                $categoryCounts['perda'] += $total;
            } elseif (str_contains($nama, 'undang') || $kode === 'uu' || str_contains($nama, 'perpu')) {
                $categoryCounts['undang-undang'] += $total;
                $categoryCounts['uu-perpu'] += $total;
            } elseif (str_contains($nama, 'presiden') || $kode === 'perpres') {
                $categoryCounts['peraturan-presiden'] += $total;
                $categoryCounts['perpres'] += $total;
            } elseif (str_contains($nama, 'pemerintah') || $kode === 'pp') {
                $categoryCounts['peraturan-pemerintah'] += $total;
                $categoryCounts['pp'] += $total;
            } elseif (str_contains($nama, 'menteri') || str_contains($nama, 'lembaga') || str_contains($nama, 'badan') || str_contains($kode, 'permen')) {
                $categoryCounts['permen-perban'] += $total;
            } elseif (str_contains($nama, 'putusan') || str_contains($nama, 'mahkamah') || str_contains($kode, 'mk') || str_contains($kode, 'ma')) {
                $categoryCounts['putusan-mk-ma'] += $total;
            }
        }

        return Inertia::render('Home', [
            'categoryCounts' => $categoryCounts,
        ]);
    }
}
