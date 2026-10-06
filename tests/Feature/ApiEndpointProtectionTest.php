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
}
