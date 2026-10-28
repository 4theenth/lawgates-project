<?php

namespace App\Http\Requests\Bookmark;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validasi bersama untuk membuat dan mengubah folder koleksi.
 *
 * Keunikan nama folder tidak diperiksa di sini karena aturannya
 * case-insensitive dan dipusatkan di BookmarkService; database juga punya
 * unique index ekspresi sebagai pengaman terakhir.
 */
class BookmarkCollectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->input('name'))) {
            $this->merge(['name' => trim($this->input('name'))]);
        }

        if ($this->input('description') === '') {
            $this->merge(['description' => null]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama folder tidak boleh kosong.',
            'name.string' => 'Nama folder harus berupa teks.',
            'name.max' => 'Nama folder maksimal 50 karakter.',
            'description.string' => 'Deskripsi folder harus berupa teks.',
            'description.max' => 'Deskripsi folder maksimal 500 karakter.',
        ];
    }
}
