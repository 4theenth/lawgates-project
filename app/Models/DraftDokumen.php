<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DraftDokumen extends Model
{
    use HasFactory;

    protected $table = 'draft_dokumen';

    protected $fillable = [
        'nama_draft',
        'user_id',
        'autor',
        'jumlah_file',
        'files_data',
        'status',
    ];

    protected $casts = [
        'files_data' => 'array',
        'jumlah_file' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
