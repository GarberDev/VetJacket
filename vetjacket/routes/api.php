<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\PersonPetInfoController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/google-callback', [AuthController::class, 'handleGoogleCallback'])->name('google-callback');

// Person-Pet Info Routes
// Public route for creating person-pet info with UUID passed in URL
Route::post('/person-pet-info/{uuid}', [PersonPetInfoController::class, 'store']);

// Protected routes for reading, updating, and deleting person-pet info
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/person-pet-info', [PersonPetInfoController::class, 'index']);
    Route::get('/person-pet-info/{id}', [PersonPetInfoController::class, 'show'])->where('id', '[0-9a-fA-F-]{36}');
    Route::put('/person-pet-info/{id}', [PersonPetInfoController::class, 'update'])->where('id', '[0-9a-fA-F-]{36}');
    Route::delete('/person-pet-info/{id}', [PersonPetInfoController::class, 'destroy'])->where('id', '[0-9a-fA-F-]{36}');
});
// In your routes/api.php file

Route::get('/users/{uuid}', [UserController::class, 'getUserByUUID']);
