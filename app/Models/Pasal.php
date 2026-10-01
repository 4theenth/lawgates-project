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
    public function strukturDokumen()
    {
        return $this->belongsTo(StrukturDokumen::class, 'struktur_id');
    }

    public function penjelasan()
    {
        return $this->hasOne(PenjelasanPasal::class, 'pasal_id');
    }

    public function parent()
    {
        return $this->belongsTo(Pasal::class, 'parent_pasal_id');
    }

    public function children()
    {
        return $this->hasMany(Pasal::class, 'parent_pasal_id')->orderBy('urutan');
    }
}