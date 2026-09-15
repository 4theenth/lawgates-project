<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LawRelation extends Model
{
    protected $table = 'law_relations';
    protected $guarded = [];
    public $timestamps = false; // Ubah ke true jika di migrasimu ada $table->timestamps()

    // Relasi ke peraturan asal (misal: UU Cipta Kerja)
    public function fromPeraturan()
    {
        return $this->belongsTo(\App\Models\Peraturan::class, 'from_peraturan_id');
    }

    // Relasi ke peraturan target (misal: UU yang diubah/dicabut)
    public function toPeraturan()
    {
        return $this->belongsTo(\App\Models\Peraturan::class, 'to_peraturan_id');
    }

    // Relasi ke jenis status relasinya (mencabut, diubah_oleh, dll)
    public function relationType()
    {
        return $this->belongsTo(\App\Models\RelationType::class, 'relation_type_id');
    }
}