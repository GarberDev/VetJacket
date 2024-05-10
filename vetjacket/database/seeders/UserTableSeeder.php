<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Hyun Oh',
            'email' => 'amcvalencia@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now()
        ]);

        User::create([
            'name' => 'Justin Test',
            'email' => 'justingarberdevelopment@gmail.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now()
        ]);
        User::create([
            'name' => 'KVSU 1',
            'email' => 'tester1@kvsu.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now()
        ]);
    }
}
