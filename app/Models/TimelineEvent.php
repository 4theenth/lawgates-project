<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Event regulasi yang sudah didenormalisasi untuk timeline (REG-04).
 *
 * Dibangun ulang dari tabel `peraturan` oleh `timeline:build`, bukan ditulis
 * langsung oleh alur CRUD peraturan. Karena itu model ini sengaja tipis: tanpa
 * relasi balik ke Peraturan, yang justru dihindari oleh tabel denormalisasi ini.
 */
class TimelineEvent extends Model
{
    public const TYPE_TERBIT = 'terbit';

    public const TYPE_DICABUT = 'dicabut';

    protected $table = 'timeline_events';

    protected $fillable = [
        'regulation_id',
        'regulation_unique_id',
        'event_type',
        'event_date',
        'regulation_type',
        'instansi',
        'subjek',
        'lokasi_daerah',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    /**
     * Rentang tanggal. Dipakai kedua endpoint; `$end` inklusif.
     */
    public function scopeBetweenDates(Builder $query, string $start, string $end): Builder
    {
        return $query->whereBetween('event_date', [$start, $end]);
    }

    public function scopeOfTypes(Builder $query, array $types): Builder
    {
        return $query->when($types !== [], fn (Builder $q) => $q->whereIn('regulation_type', $types));
    }

    public function scopeOfSubjekList(Builder $query, array $subjek): Builder
    {
        return $query->when($subjek !== [], fn (Builder $q) => $q->whereIn('subjek', $subjek));
    }

    public function scopeOfLokasiList(Builder $query, array $lokasi): Builder
    {
        return $query->when($lokasi !== [], fn (Builder $q) => $q->whereIn('lokasi_daerah', $lokasi));
    }

    public function scopeOfInstansiList(Builder $query, array $instansi): Builder
    {
        return $query->when($instansi !== [], fn (Builder $q) => $q->whereIn('instansi', $instansi));
    }
}
