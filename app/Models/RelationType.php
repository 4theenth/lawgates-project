<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RelationType extends Model
{
    protected $table = 'relation_types';
    protected $guarded = [];
    public $timestamps = false;

    // Satu jenis relasi bisa dimiliki oleh banyak data LawRelation
    public function lawRelations()
    {
        return $this->hasMany(\App\Models\LawRelation::class, 'relation_type_id');
    }
}