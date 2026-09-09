<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class StatusPeraturan extends Model
{
    protected $table = 'status_peraturan';
    public $timestamps = false;
    protected $fillable = ['nama_status'];
}