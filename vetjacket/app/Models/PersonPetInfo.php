<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PersonPetInfo extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'person_pet_info';

    // Specify the primary key if it's not 'id' and its type
    protected $primaryKey = 'id';
    public $incrementing = false;  // Since we're using UUIDs, set incrementing to false
    protected $keyType = 'string'; // Since UUIDs are strings, set the keyType to string

    // Enable timestamps, matching the migration which includes timestamp fields
    public $timestamps = true;

    // Specify which attributes can be mass assignable
    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'primary_cell_number', 'secondary_number',
        'secondary_name', 'address', 'email', 'dl', 'human_birthday',
        'pets_name', 'pets_species', 'pets_breed', 'pet_color', 'pet_age',
        'pet_gender'
    ];

    // Optionally, specify attributes that should be cast to native types
    protected $casts = [
        'human_birthday' => 'date', // casting for dates
        'pet_age' => 'integer', // casting integers
    ];
    protected static function boot()
    {
        parent::boot();
    
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = $model->{$model->getKeyName()} ?? (string) Str::uuid();
        });
    }
    
    // Define the relationship to User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
