<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileAvatarTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_upload_avatar(): void
    {
        Storage::fake('public');

        $user = $this->admin();

        $response = $this
            ->actingAs($user)
            ->from('/admin/profile')
            ->post('/profile/avatar', [
                'avatar' => UploadedFile::fake()->image('foto.jpg', 200, 200),
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/admin/profile');

        $user->refresh();
        $rawAvatar = $user->getRawOriginal('avatar');

        $this->assertNotNull($rawAvatar);
        $this->assertStringStartsWith('avatars/', $rawAvatar);
        Storage::disk('public')->assertExists($rawAvatar);
    }

    public function test_avatar_accessor_returns_host_independent_url(): void
    {
        $user = User::factory()->create(['avatar' => 'avatars/foto.jpg']);

        $this->assertSame('/storage/avatars/foto.jpg', $user->avatar);
    }

    public function test_avatar_accessor_keeps_external_url(): void
    {
        $url = 'https://lh3.googleusercontent.com/a/foto.jpg';
        $user = User::factory()->create(['avatar' => $url]);

        $this->assertSame($url, $user->avatar);
    }

    public function test_uploading_new_avatar_removes_previous_file(): void
    {
        Storage::fake('public');

        $user = $this->admin();

        $this->actingAs($user)->from('/admin/profile')->post('/profile/avatar', [
            'avatar' => UploadedFile::fake()->image('lama.jpg', 100, 100),
        ])->assertSessionHasNoErrors();

        $oldPath = $user->refresh()->getRawOriginal('avatar');
        Storage::disk('public')->assertExists($oldPath);

        $this->actingAs($user)->from('/admin/profile')->post('/profile/avatar', [
            'avatar' => UploadedFile::fake()->image('baru.png', 100, 100),
        ])->assertSessionHasNoErrors();

        $newPath = $user->refresh()->getRawOriginal('avatar');

        $this->assertNotSame($oldPath, $newPath);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($newPath);
    }

    public function test_avatar_must_be_supported_image_under_two_megabytes(): void
    {
        Storage::fake('public');

        $user = $this->admin();

        $this
            ->actingAs($user)
            ->from('/admin/profile')
            ->post('/profile/avatar', [
                'avatar' => UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf'),
            ])
            ->assertSessionHasErrors('avatar');

        $this
            ->actingAs($user)
            ->from('/admin/profile')
            ->post('/profile/avatar', [
                'avatar' => UploadedFile::fake()->image('besar.jpg')->size(3000),
            ])
            ->assertSessionHasErrors('avatar');

        $this->assertNull($user->refresh()->getRawOriginal('avatar'));
    }

    public function test_admin_can_delete_avatar(): void
    {
        Storage::fake('public');

        $user = $this->admin();

        $this->actingAs($user)->from('/admin/profile')->post('/profile/avatar', [
            'avatar' => UploadedFile::fake()->image('foto.webp', 100, 100),
        ])->assertSessionHasNoErrors();

        $path = $user->refresh()->getRawOriginal('avatar');

        $this
            ->actingAs($user)
            ->from('/admin/profile')
            ->delete('/profile/avatar')
            ->assertSessionHasNoErrors()
            ->assertRedirect('/admin/profile');

        $this->assertNull($user->refresh()->getRawOriginal('avatar'));
        Storage::disk('public')->assertMissing($path);
    }

    public function test_deleting_external_avatar_does_not_touch_local_disk(): void
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'role' => 'admin',
            'avatar' => 'https://lh3.googleusercontent.com/a/foto.jpg',
        ]);

        $this
            ->actingAs($user)
            ->from('/admin/profile')
            ->delete('/profile/avatar')
            ->assertSessionHasNoErrors();

        $this->assertNull($user->refresh()->getRawOriginal('avatar'));
        Storage::disk('public')->assertDirectoryEmpty('/');
    }
}
