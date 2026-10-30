<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/');
    }

    public function test_unverified_user_cannot_log_in(): void
    {
        $user = User::factory()->unverified()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertGuest();
        $response->assertSessionHasErrors(['email' => 'Email '.$user->email.' belum diverifikasi. Buka tautan verifikasi yang kami kirim, lalu masuk kembali.']);
        $response->assertSessionHasErrors(['auth' => 'unverified_email']);
    }

    public function test_verification_link_works_without_login(): void
    {
        $user = User::factory()->unverified()->create();

        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        // Klik tautan verifikasi = langsung masuk ke akun, tanpa login ulang.
        $this->get($url)->assertRedirect(route('home'));
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $this->assertAuthenticatedAs($user->fresh());
    }

    public function test_verified_user_can_log_in_after_verifying(): void
    {
        $user = User::factory()->unverified()->create();

        $url = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );
        $this->get($url);

        $this->post('/login', ['email' => $user->email, 'password' => 'password']);

        $this->assertAuthenticatedAs($user->fresh());
    }

    public function test_admin_redirects_to_admin_dashboard_on_login(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_admin_redirects_to_admin_dashboard_even_if_intended_is_root(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        // intended '/' tidak sah (safeIntended menolaknya), jadi harus fallback
        // ke dashboard admin dan bukan ke '/'.
        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
            'redirect' => '/',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_superadmin_redirects_to_admin_dashboard_on_login(): void
    {
        $superadmin = User::factory()->create(['role' => 'superadmin']);

        $response = $this->post('/login', [
            'email' => $superadmin->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_login_redirects_to_internal_intended_path(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'redirect' => '/pencarian?keyword=uu&tahun=2020',
        ]);

        $response->assertRedirect('/pencarian?keyword=uu&tahun=2020');
    }

    /**
     * Nilai `redirect` datang dari URL yang bisa ditulis siapa saja.
     * `//evil.com` dan `/\evil.com` dibaca browser sebagai URL absolut, jadi
     * harus dibuang agar pengguna tidak mendarat di domain lain setelah login.
     */
    public function test_login_ignores_open_redirect_payloads(): void
    {
        $user = User::factory()->create();

        foreach (['//evil.com', '/\\evil.com', 'https://evil.com', 'evil.com'] as $payload) {
            $response = $this->post('/login', [
                'email' => $user->email,
                'password' => 'password',
                'redirect' => $payload,
            ]);

            $this->assertAuthenticated();
            $response->assertRedirect('/');
            $this->post('/logout');
        }
    }

    public function test_admin_follows_intended_search_path(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
            'redirect' => '/pencarian?keyword=uu',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/pencarian?keyword=uu');
    }

    public function test_login_redirects_to_category_slug_intended_path(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
            'redirect' => '/kategori/undang-undang',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect('/kategori/undang-undang');
    }

    public function test_login_screen_preserves_category_redirect_parameter(): void
    {
        $response = $this->get('/login?redirect=/kategori/undang-undang');

        $response->assertStatus(200);
        $this->assertEquals('/kategori/undang-undang', session('url.intended'));
    }
}
