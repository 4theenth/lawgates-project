<?php

namespace App\Policies;

use App\Models\BookmarkCollection;
use App\Models\User;

class BookmarkCollectionPolicy
{
    public function update(User $user, BookmarkCollection $collection): bool
    {
        return $collection->user_id === $user->id;
    }

    public function delete(User $user, BookmarkCollection $collection): bool
    {
        return $collection->user_id === $user->id;
    }
}
