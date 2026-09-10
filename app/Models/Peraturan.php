<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Peraturan extends Model
{
    // Tambahkan SoftDeletes karena ada $table->softDeletes() di migration
    use HasFactory, SoftDeletes;

    // Mendefinisikan nama tabel secara eksplisit
    protected $table = 'peraturan';

    // Semua kolom yang diizinkan untuk diisi
    protected $fillable = [
        'unique_id',
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

    // Konversi tipe data (Casting) otomatis saat ditarik/disimpan
    protected $casts = [
        'embedding' => 'array', // Otomatis mengubah JSON PostgreSQL menjadi Array di PHP
        'tanggal_penetapan' => 'date',
        'tanggal_pengundangan' => 'date',
        'tanggal_berlaku' => 'date',
    ];

    // Relasi ke tabel jenis_peraturan
    public function jenisPeraturan()
    {
        return $this->belongsTo(JenisPeraturan::class, 'jenis_peraturan_id');
    }

    // Relasi ke tabel status_peraturan
    public function statusPeraturan()
    {
        return $this->belongsTo(StatusPeraturan::class, 'status_id');
    }
}

