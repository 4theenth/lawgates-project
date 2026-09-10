<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    // Sesuaikan nama tabel jika di database kamu bernama 'status'
    protected $table = 'status_peraturan'; 
    protected $guarded = [];
}