<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Peraturan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'peraturan';

    protected $fillable = [
        'unique_id',
        'file_pdf_path',
        'jenis_peraturan_id',
        'nomor',
        'tahun',
        'judul',
        'status_id',
        'tempat_penetapan',
        'tanggal_penetapan',
        'tanggal_pengundangan',
        'tanggal_berlaku',
        'instansi',
        'url_detail',
        'url_pdf',
        'embedding',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected $casts = [
        'embedding' => 'array', 
        'tanggal_penetapan' => 'date',
        'tanggal_pengundangan' => 'date',
        'tanggal_berlaku' => 'date',
    ];

    public function jenisPeraturan()
    {
        return $this->belongsTo(\App\Models\JenisPeraturan::class, 'jenis_peraturan_id');
    }

    public function statusPeraturan()
    {
        return $this->belongsTo(\App\Models\Status::class, 'status_id');
    }

    // Tambahan relasi ke tabel pasal
    public function pasal()
    {
        return $this->hasMany(\App\Models\Pasal::class, 'peraturan_id');
    }
    
    public function strukturDokumen()
    {
        return $this->hasMany(\App\Models\StrukturDokumen::class, 'peraturan_id');
    }
    public function lawRelations()
    {
        return $this->hasMany(\App\Models\LawRelation::class, 'from_peraturan_id');
    }
}