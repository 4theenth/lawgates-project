<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'admins';

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'is_active',
        'invited_by',
        'deactivated_by',
        'deactivated_at',
    ];

    protected $hidden = [
        'password',
    ];

    public function getNameAttribute(): string
    {
        return $this->username ?? '';
    }
}
