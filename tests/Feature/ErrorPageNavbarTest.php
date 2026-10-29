<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Halaman error dirender dari route fallback (bukan dari jalur exception tanpa
 * sesi), jadi state navbar-nya harus mengikuti halaman lain: tamu melihat
 * "Masuk", pengguna yang sudah login melihat identitas akunnya.
 */
class ErrorPageNavbarTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_sees_login_button_on_404_page(): void
    {
        $response = $this->get('/dadawda');

        $response->assertStatus(404);
        $response->assertSee('Masuk');
        $response->assertDontSee('DASHBOARD');
    }

    public function test_logged_in_admin_sees_dashboard_pill_on_404_page(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get('/dadawda');

        $response->assertStatus(404);
        $response->assertSee('DASHBOARD');
        $response->assertDontSee('>Masuk<', false);
    }

    public function test_logged_in_user_sees_own_name_on_404_page(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->get('/dadawda');

        $response->assertStatus(404);
        $response->assertSee($user->username);
    }

    public function test_no_nav_item_is_active_on_unknown_path(): void
    {
        $response = $this->get('/dadawda');

        // 404 bukan Beranda, jadi tidak ada menu yang di-highlight.
        // (string `lg-nav__link--active` tetap ada di blok CSS halaman, jadi
        // yang diperiksa markup tautannya, bukan nama kelasnya.)
        $response->assertDontSee('lg-nav__link--active" href', false);
    }

    public function test_regulasi_menu_is_active_under_regulasi_path(): void
    {
        $response = $this->get('/regulasi/tidak-ada');

        $response->assertStatus(404);
        $response->assertSee('lg-nav__link--active" href="'.url('/regulasi').'"', false);
    }

    public function test_api_404_stays_json(): void
    {
        $this->getJson('/api/tidak-ada')->assertStatus(404);
    }
}
