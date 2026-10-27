<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validasi bersama untuk kedua endpoint timeline (REG-04).
 *
 * Request ini sengaja TIDAK memotong rentang: AC clamping dikerjakan
 * `TimelineService::resolveRange()` supaya nilai asli dari klien tetap utuh
 * saat service memutuskan apa yang dipotong dan melaporkannya lewat
 * `truncated`. Kalau request memotong lebih dulu, service tidak lagi bisa tahu
 * bahwa permintaannya sebenarnya melewati batas.
 */
class TimelineEventsRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Endpoint publik; otorisasi diatur di level route.
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            // Filter bernilai banyak karena toolbar timeline memakai multi-select.
            // Klien boleh mengirim `?regulation_type=UU,PERDA` maupun
            // `?regulation_type[]=UU&regulation_type[]=PERDA`.
            'regulation_type' => ['nullable'],
            'subjek' => ['nullable'],
            'lokasi' => ['nullable'],
            'instansi' => ['nullable'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'start_date.required' => 'Parameter start_date wajib diisi.',
            'end_date.required' => 'Parameter end_date wajib diisi.',
            'end_date.after_or_equal' => 'end_date tidak boleh lebih awal dari start_date.',
        ];
    }

    /**
     * Catatan: lebar rentang (maksimal 5 tahun per segmen) sengaja TIDAK
     * divalidasi di sini. AC meminta rentang yang terlalu lebar dipotong, bukan
     * ditolak, dan pemotongan itu dikerjakan `TimelineService::resolveRange()`.
     */
    public function startDate(): string
    {
        return $this->input('start_date');
    }

    public function endDate(): string
    {
        return $this->input('end_date');
    }

    public function regulationTypes(): array
    {
        return $this->stringList('regulation_type', upper: true);
    }

    public function subjek(): array
    {
        return $this->stringList('subjek');
    }

    public function lokasi(): array
    {
        return $this->stringList('lokasi');
    }

    public function instansi(): array
    {
        return $this->stringList('instansi');
    }

    /**
     * Menerima `?x=a,b` maupun `?x[]=a&x[]=b` supaya pemanggil tidak perlu tahu
     * bentuk mana yang diharapkan. Nilai kosong dibuang agar filter kosong
     * benar-benar berarti "tanpa filter", bukan "cari yang kosong".
     *
     * @return array<int, string>
     */
    private function stringList(string $key, bool $upper = false): array
    {
        $raw = $this->input($key);

        if ($raw === null || $raw === '') {
            return [];
        }

        $values = is_array($raw) ? $raw : explode(',', (string) $raw);

        $values = array_map(
            fn ($v) => trim((string) $v),
            $values
        );

        $values = array_values(array_filter($values, fn (string $v) => $v !== ''));

        return $upper ? array_map(fn (string $v) => mb_strtoupper($v), $values) : $values;
    }
}
