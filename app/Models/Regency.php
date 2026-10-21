<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Regency extends Model
{
    protected $fillable = [
        'province_id',
        'kode',
        'nama',
        'tipe',
        'slug',
    ];

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id');
    }
}
