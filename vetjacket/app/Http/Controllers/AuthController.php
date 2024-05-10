<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generate the token for the user (using Laravel Sanctum)
        $token = $user->createToken('app_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function handleGoogleCallback(Request $request)
    {
        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);  // Specify the CLIENT_ID
        $payload = $client->verifyIdToken($request->token);

        if ($payload) {
            $userId = $payload['sub'];
            ray($payload);
            // If the user exists in your database, log them in. Otherwise, create a new user.
            $user = User::firstOrCreate(
                ['google_id' => $userId],
                [
                    'name' => $payload['name'],
                    'email' => $payload['email'],
                    'role' => RoleEnum::hospital
                ]
            );
            $token = $user->createToken('app_token')->plainTextToken;
            return response()->json(['user' => $user, 'token' => $token]);
        } else {
            // Invalid token
            return response()->json(['error' => 'Invalid token.'], 401);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
    
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
    
            $user = Auth::user();
            $token = $user->createToken('app_token')->plainTextToken;
    
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
    
    }
