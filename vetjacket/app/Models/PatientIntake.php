<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PatientIntake extends Model
{
    use HasFactory;

    protected $table = 'patient_intakes';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'email', 'primary_cell_number', 
        'pets_name', 'question_1', 'question_2', 'question_3', 'question_4', 
        'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 
        'question_10', 'question_11'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = $model->{$model->getKeyName()} ?? (string) Str::uuid();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
