<?php

namespace App\Http\Requests\Bookmark;

use Illuminate\Foundation\Http\FormRequest;

class BulkAssignBookmarkCollectionsRequest extends FormRequest
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
            'bookmark_ids' => ['required', 'array', 'min:1'],
            'bookmark_ids.*' => ['integer'],
            'collection_ids' => ['required', 'array', 'min:1'],
            'collection_ids.*' => ['integer'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'bookmark_ids.required' => 'Pilih minimal satu bookmark.',
            'bookmark_ids.array' => 'Daftar bookmark tidak valid.',
            'bookmark_ids.min' => 'Pilih minimal satu bookmark.',
            'bookmark_ids.*.integer' => 'Bookmark tidak valid.',
            'collection_ids.required' => 'Pilih minimal satu folder.',
            'collection_ids.array' => 'Daftar folder tidak valid.',
            'collection_ids.min' => 'Pilih minimal satu folder.',
            'collection_ids.*.integer' => 'Folder tidak valid.',
        ];
    }
}
