<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByUUID($uuid)
    {
        $user = User::where('id', $uuid)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        return response()->json(['user' => $user->only('name', 'email')]); // Assuming you only want to expose name and email
    }
}
