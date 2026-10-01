<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasalPerubahan extends Model
{
    protected $table = 'pasal_perubahans'; // Sesuaikan jika nama tabel di migrasimu tanpa huruf 's'
    protected $guarded = [];
    public $timestamps = false;

    // Relasi ke pasal induk (pasal romawi / pasal pembuka) di peraturan saat ini
    public function pasalRomawi()
    {
        return $this->belongsTo(\App\Models\Pasal::class, 'pasal_romawi_id');
    }

    // Relasi ke undang-undang target yang pasalnya sedang diubah
    public function targetPeraturan()
    {
        return $this->belongsTo(\App\Models\Peraturan::class, 'target_peraturan_id');
    }

    // Relasi ke jenis perubahannya (diubah/dihapus/ditambah)
    public function perubahanType()
    {
        return $this->belongsTo(\App\Models\PerubahanType::class, 'perubahan_type_id');
    }
}