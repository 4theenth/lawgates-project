<?php

namespace App\Http\Requests\Bookmark;

use App\Services\BookmarkService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ToggleBookmarkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', 'string', Rule::in(array_keys(BookmarkService::ALLOWED_TYPES))],
            'id' => ['required', 'integer', 'min:1'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type.required' => 'Tipe bookmark wajib diisi.',
            'type.in' => 'Tipe bookmark tidak dikenal.',
            'id.required' => 'ID peraturan wajib diisi.',
            'id.integer' => 'ID peraturan harus berupa angka.',
            'id.min' => 'ID peraturan tidak valid.',
        ];
    }
}
