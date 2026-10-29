<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pasal extends Model
{
    protected $table = 'pasal';
    protected $guarded = [];
    public $timestamps = false;

    protected static function booted(): void
    {
        static::saved(function () {
            \App\Services\SemanticSearchService::clearCache();
        });

        static::deleted(function () {
            \App\Services\SemanticSearchService::clearCache();
        });
    }

    protected $casts = [
        'embedding' => 'array',
    ];

    protected $hidden = [
        'embedding',
        'embedding_vec',
    ];

    /**
     * Mutator agar kolom embedding (JSON) dan embedding_vec (float8[]) selalu sinkron otomatis.
     */
    public function setEmbeddingAttribute($value)
    {
        $supportsVec = \Illuminate\Support\Facades\DB::getDriverName() === 'pgsql';

        if (is_array($value)) {
            $this->attributes['embedding'] = json_encode($value);
            if ($supportsVec) {
                $this->attributes['embedding_vec'] = '{' . implode(',', $value) . '}';
            }
        } elseif (is_string($value)) {
            $this->attributes['embedding'] = $value;
            $decoded = json_decode($value, true);
            if (is_array($decoded) && $supportsVec) {
                $this->attributes['embedding_vec'] = '{' . implode(',', $decoded) . '}';
            }
        } else {
            $this->attributes['embedding'] = null;
            if ($supportsVec) {
                $this->attributes['embedding_vec'] = null;
            }
        }
    }

    // Tambahan relasi balik ke tabel peraturan
    public function peraturan()
    {
        return $this->belongsTo(\App\Models\Peraturan::class, 'peraturan_id');
    }

    // Relasi ke tabel struktur_dokumen (Bab/Bagian/Paragraf) yang baru kita buat
    public function strukturDokumen()
    {
        return $this->belongsTo(StrukturDokumen::class, 'struktur_id');
    }

    public function penjelasan()
    {
        return $this->hasOne(PenjelasanPasal::class, 'pasal_id');
    }

    public function parent()
    {
        return $this->belongsTo(Pasal::class, 'parent_pasal_id');
    }

    public function children()
    {
        return $this->hasMany(Pasal::class, 'parent_pasal_id')->orderBy('urutan');
    }
}