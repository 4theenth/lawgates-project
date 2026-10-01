<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $table = 'documents';
    protected $primaryKey = 'document_id'; // Jika primary key-nya bukan 'id'
    public $incrementing = false; // Jika document_id berupa string/UUID, bukan auto-increment
    protected $keyType = 'string'; // Ubah ke 'int' jika document_id berupa angka
    protected $guarded = [];
}