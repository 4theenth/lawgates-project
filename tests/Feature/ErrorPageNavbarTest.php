<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Halaman error dirender melalui Inertia agar memakai layout publik yang sama
 * dengan halaman lain (Navbar/Footer React). State navbar-nya karena itu
 * mengikuti halaman reguler: tamu melihat "LOGIN", pengguna yang sudah login
 * melihat identitas akunnya.
 */
class ErrorPageNavbarTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_gets_inertia_error_page_without_authenticated_user(): void
    {
        $response = $this->get('/dadawda');

        $response->assertNotFound();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('status', 404)
            ->where('title', 'Halaman Tidak Ditemukan')
            ->where('primaryUrl', null)
            ->where('auth.user', null)
        );
    }

    public function test_logged_in_admin_gets_authenticated_user_props_on_404_page(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/dadawda');

        $response->assertNotFound();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('auth.user.id', $admin->id)
            ->where('auth.user.role', 'admin')
        );
    }

    public function test_logged_in_user_gets_authenticated_user_props_on_404_page(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->get('/dadawda');

        $response->assertNotFound();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('auth.user.id', $user->id)
            ->where('auth.user.role', 'user')
        );
    }

    public function test_error_page_keeps_requested_url_for_navbar_active_state(): void
    {
        $response = $this->get('/regulasi/tidak-ada');

        $response->assertNotFound();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('status', 404)
            ->url('/regulasi/tidak-ada')
        );
    }

    public function test_inertia_visit_to_unknown_page_renders_the_error_page_with_200(): void
    {
        // Inertia membutuhkan status 200 agar tetap merender halaman error alih-alih
        // menampilkan modal error generik. Versi diambil dari dokumen awal agar
        // tidak memicu respons 409 (asset version mismatch).
        $initial = $this->get('/dadawda');
        $version = $initial->viewData('page')['version'] ?? null;

        $response = $this->withHeaders([
            'X-Inertia' => 'true',
            'X-Inertia-Version' => $version,
            'Accept' => 'text/html, application/xhtml+xml',
        ])->get('/dadawda');

        $response->assertOk();
        $response->assertHeader('X-Inertia', 'true');
        $response->assertJsonPath('component', 'Errors/Show');
    }

    public function test_unauthorized_page_offers_a_login_action(): void
    {
        Route::get('/test-401', fn () => abort(401));

        $response = $this->get('/test-401');

        $response->assertUnauthorized();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('status', 401)
            ->where('primaryLabel', 'Masuk ke Akun')
            ->where('primaryUrl', url('/login'))
        );
    }

    public function test_server_error_page_uses_the_same_inertia_page(): void
    {
        Route::get('/test-500', fn () => abort(500));

        $response = $this->get('/test-500');

        $response->assertStatus(500);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Errors/Show')
            ->where('status', 500)
            ->where('title', 'Terjadi Kesalahan Server')
        );
    }

    public function test_api_404_stays_json(): void
    {
        $this->getJson('/api/tidak-ada')->assertNotFound();
    }
}
