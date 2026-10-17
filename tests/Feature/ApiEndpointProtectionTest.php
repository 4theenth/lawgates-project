<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiEndpointProtectionTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_api_request_returns_401_json(): void
    {
        // Try accessing protected search endpoint without token
        $response = $this->get('/api/search');

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_api_request_with_invalid_token_returns_401_json(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid-token-123',
            'Accept' => 'application/json',
        ])->get('/api/me');

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_authenticated_api_request_with_valid_token_is_allowed(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}",
            'Accept' => 'application/json',
        ])->get('/api/me');

        $response->assertStatus(200);
        $response->assertJson(['email' => $user->email]);
    }

    public function test_standard_user_cannot_list_users_via_api(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $token = $user->createToken('user_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}",
            'Accept' => 'application/json',
        ])->get('/api/users');

        $response->assertStatus(403);
        $response->assertJson(['message' => 'Forbidden. Akses ditolak untuk role Anda.']);
    }

    public function test_admin_can_list_users_via_api(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $admin->createToken('admin_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}",
            'Accept' => 'application/json',
        ])->get('/api/users');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data',
        ]);
    }

    public function test_superadmin_can_list_users_via_api(): void
    {
        $superadmin = User::factory()->create(['role' => 'superadmin']);
        $token = $superadmin->createToken('superadmin_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer {$token}",
            'Accept' => 'application/json',
        ])->get('/api/users');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'message',
            'data',
        ]);
    }

    public function test_unauthenticated_user_cannot_access_debug_test_peraturan_route(): void
    {
        $response = $this->get('/test-peraturan/1');

        $response->assertRedirect('/login');
    }

    public function test_unauthenticated_json_request_to_debug_test_peraturan_returns_401(): void
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->get('/test-peraturan/1');

        $response->assertStatus(401);
    }
}

