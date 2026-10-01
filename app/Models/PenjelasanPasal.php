<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenjelasanPasal extends Model
{
    protected $table = 'penjelasan_pasal';
    protected $guarded = [];

    // Relasi ke Peraturan
    public function peraturan()
    {
        return $this->belongsTo(Peraturan::class);
    }

    // Relasi ke Pasal yang dijelaskan
    public function pasal()
    {
        return $this->belongsTo(Pasal::class);
    }
}