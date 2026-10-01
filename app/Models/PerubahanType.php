<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerubahanType extends Model
{
    protected $table = 'perubahan_types';
    protected $guarded = [];
    public $timestamps = false;

    // Satu jenis perubahan bisa menaungi banyak riwayat PasalPerubahan
    public function pasalPerubahans()
    {
        return $this->hasMany(\App\Models\PasalPerubahan::class, 'perubahan_type_id');
    }
}