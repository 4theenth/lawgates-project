<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrukturDokumen extends Model
{
    protected $table = 'struktur_dokumen';
    protected $guarded = [];
    
    // Relasi ke Peraturan
    public function peraturan()
    {
        return $this->belongsTo(Peraturan::class);
    }

    // Relasi ke Induk Struktur (Self-referencing, misalnya Bagian milik Bab)
    public function parent()
    {
        return $this->belongsTo(StrukturDokumen::class, 'parent_id');
    }

    // Relasi ke Anak Struktur
    public function children()
    {
        return $this->hasMany(StrukturDokumen::class, 'parent_id');
    }

    // Relasi ke Pasal-pasal di bawah struktur ini
    public function pasals()
    {
        return $this->hasMany(Pasal::class, 'struktur_id');
    }
}