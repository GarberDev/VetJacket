<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonPetInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('person_pet_info', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('primary_cell_number');
            $table->string('secondary_number')->nullable();
            $table->string('secondary_name')->nullable();  
            $table->text('address');
            $table->string('email');
            $table->string('dl')->nullable();
            $table->date('human_birthday')->nullable();
            $table->string('pets_name');
            $table->string('pets_species');
            $table->string('pets_breed')->nullable();
            $table->string('pet_color');
            $table->integer('pet_age');
            $table->string('pet_gender');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('person_pet_info', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('person_pet_info');
    }
}
