<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Tests\TestCase;

class AuthRateLimitingTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_login_locks_account_after_5_failed_attempts(): void
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        $throttleKey = Str::transliterate('testuser@example.com|127.0.0.1');
        RateLimiter::clear($throttleKey);

        // 1 to 4 failed attempts
        for ($i = 1; $i <= 4; $i++) {
            $response = $this->postJson('/api/login', [
                'email' => 'testuser@example.com',
                'password' => 'wrong-password',
            ]);

            $response->assertStatus(401);
            $response->assertJsonStructure(['message', 'remaining_attempts']);
            $this->assertEquals(5 - $i, $response->json('remaining_attempts'));
        }

        // 5th failed attempt -> locks account for 15 mins
        $response5 = $this->postJson('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'wrong-password',
        ]);
        $response5->assertStatus(401);

        // 6th attempt -> 429 Too Many Requests
        $response6 = $this->postJson('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ]);

        $response6->assertStatus(429);
        $response6->assertJsonStructure(['message', 'retry_after_seconds', 'retry_after_minutes']);
        $this->assertStringContainsString('Akun terkunci sementara', $response6->json('message'));
    }

    public function test_api_login_clears_rate_limiter_on_successful_login(): void
    {
        $user = User::factory()->create([
            'email' => 'successuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        $throttleKey = Str::transliterate('successuser@example.com|127.0.0.1');
        RateLimiter::clear($throttleKey);

        // 2 failed attempts
        $this->postJson('/api/login', [
            'email' => 'successuser@example.com',
            'password' => 'wrong',
        ]);
        $this->postJson('/api/login', [
            'email' => 'successuser@example.com',
            'password' => 'wrong',
        ]);

        // Successful login resets rate limiter
        $response = $this->postJson('/api/login', [
            'email' => 'successuser@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['access_token', 'user']);
        $this->assertEquals(0, RateLimiter::attempts($throttleKey));
    }
}
