<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Auth\Events\Registered;

class GoogleAuthController extends Controller
{
    public function callback(Request $request)
    {
        $request->validate([
            'access_token' => 'required|string',
            'remember' => 'boolean'
        ]);

        $accessToken = $request->access_token;
        $remember = $request->boolean('remember', true);

        // Fetch user info from Google
        $response = Http::withToken($accessToken)
            ->get('https://www.googleapis.com/oauth2/v3/userinfo');

        if ($response->failed()) {
            return response()->json(['message' => 'Invalid Google access token'], 401);
        }

        $googleUser = $response->json();

        // Check if user exists
        $user = User::where('email', $googleUser['email'])->first();

        if ($user) {
            // Update google_id if not set
            if (!$user->google_id) {
                $user->update(['google_id' => $googleUser['sub']]);
            }
        } else {
            // Create new user
            $user = User::create([
                'username' => $googleUser['name'],
                'email' => $googleUser['email'],
                'google_id' => $googleUser['sub'],
                'auth_provider' => 'google',
                'password' => null,
            ]);

            event(new Registered($user));
        }

        Auth::login($user, $remember);

        if (in_array($user->role, ['admin', 'superadmin'])) {
            return redirect()->intended(route('admin.dashboard'));
        }

        return redirect()->intended('/');
    }
}
