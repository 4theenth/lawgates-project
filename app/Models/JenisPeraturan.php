<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPeraturan extends Model
{
    protected $table = 'jenis_peraturan'; 
    protected $guarded = [];
    public $timestamps = false; // Tambahkan baris ini
}