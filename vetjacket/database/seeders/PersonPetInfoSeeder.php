<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str; // Import the Str facade to generate UUIDs

class PersonPetInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userId = DB::table('users')->first()->id;

        DB::table('person_pet_info')->insert([
            'id' => Str::uuid(), // Generate a UUID for the 'id' field
            'user_id' => $userId,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'primary_cell_number' => '123-456-7890',
            'secondary_number' => '098-765-4321',
            'secondary_name' => 'Jane Doe',
            'address' => '1234 Elm Street, Springfield',
            'email' => 'johndoe@example.com',
            'dl' => 'X1234567',
            'human_birthday' => Carbon::create('1980', '01', '01')->toDateString(),
            'pets_name' => 'Rex',
            'pets_species' => 'Dog',
            'pets_breed' => 'Labrador',
            'pet_color' => 'Yellow',
            'pet_age' => 5,
            'pet_gender' => 'M',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
