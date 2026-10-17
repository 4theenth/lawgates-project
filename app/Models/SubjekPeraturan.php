<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjekPeraturan extends Model
{
    use HasFactory;

    protected $table = 'subjek_peraturan';

    protected $fillable = [
        'nama',
        'deskripsi',
    ];

    /**
     * Relasi ke peraturan yang memiliki subjek ini.
     */
    public function peraturan()
    {
        return $this->hasMany(Peraturan::class, 'subjek', 'nama');
    }
}
