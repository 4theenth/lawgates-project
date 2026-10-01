<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    // Sesuaikan nama tabelnya dengan yang kamu temukan di pgAdmin sebelumnya
    protected $table = 'status_peraturan'; 
    protected $guarded = [];
    public $timestamps = false; // Tambahkan baris ini
}