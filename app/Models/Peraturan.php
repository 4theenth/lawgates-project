<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Peraturan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'peraturan';

    protected $appends = [
        'is_available',
        'has_pembukaan',
        'has_pasal',
    ];

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

    public function getHasPembukaanAttribute(): bool
    {
        if (isset($this->attributes['pembukaan_count'])) {
            return (int) $this->attributes['pembukaan_count'] > 0;
        }

        if ($this->relationLoaded('strukturDokumen')) {
            return $this->strukturDokumen->where('tipe_struktur', 'PEMBUKAAN')->count() > 0;
        }

        return $this->strukturDokumen()->where('tipe_struktur', 'PEMBUKAAN')->exists();
    }

    public function getHasPasalAttribute(): bool
    {
        if (isset($this->attributes['pasal_count'])) {
            return (int) $this->attributes['pasal_count'] > 0;
        }

        if ($this->relationLoaded('pasal')) {
            return $this->pasal->count() > 0;
        }

        return $this->pasal()->exists();
    }

    public function getIsAvailableAttribute(): bool
    {
        if ($this->judul && Str::contains(strtolower($this->judul), 'menunggu import')) {
            return false;
        }

        return $this->has_pembukaan && $this->has_pasal;
    }
}