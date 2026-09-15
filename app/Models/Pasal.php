<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pasal extends Model
{
    protected $table = 'pasal';
    protected $guarded = [];
    public $timestamps = false;

    // Tambahan relasi balik ke tabel peraturan
    public function peraturan()
    {
        return $this->belongsTo(\App\Models\Peraturan::class, 'peraturan_id');
    }

    // Relasi ke tabel struktur_dokumen (Bab/Bagian/Paragraf) yang baru kita buat
    public function struktur()
    {
        return $this->belongsTo(\App\Models\StrukturDokumen::class, 'struktur_id');
    }
}