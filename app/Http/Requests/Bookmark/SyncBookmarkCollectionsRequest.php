<?php

namespace App\Http\Requests\Bookmark;

use Illuminate\Foundation\Http\FormRequest;

class SyncBookmarkCollectionsRequest extends FormRequest
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
            'collection_ids' => ['present', 'array'],
            'collection_ids.*' => ['integer'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'collection_ids.present' => 'Daftar folder wajib dikirim.',
            'collection_ids.array' => 'Daftar folder tidak valid.',
            'collection_ids.*.integer' => 'Folder tidak valid.',
        ];
    }
}
