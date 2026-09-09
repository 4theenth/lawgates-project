<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class JenisPeraturan extends Model
{
    protected $table = 'jenis_peraturan';
    public $timestamps = false; // Tambahkan ini jika tabelmu tidak punya created_at/updated_at
    protected $fillable = ['kode', 'nama'];
}