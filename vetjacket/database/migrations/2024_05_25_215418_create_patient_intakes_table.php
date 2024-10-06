<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientIntakesTable extends Migration
{
    public function up()
    {
        Schema::create('patient_intakes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('primary_cell_number')->nullable();
            $table->string('pets_name');
            $table->timestamps();
            // Questions
            $table->text('question_1')->nullable();
            $table->text('question_2')->nullable();
            $table->text('question_3')->nullable();
            $table->text('question_4')->nullable();
            $table->text('question_5')->nullable();
            $table->text('question_6')->nullable();
            $table->text('question_7')->nullable();
            $table->text('question_8')->nullable();
            $table->text('question_9')->nullable();
            $table->text('question_10')->nullable();
            $table->text('question_11')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patient_intakes');
    }
}
