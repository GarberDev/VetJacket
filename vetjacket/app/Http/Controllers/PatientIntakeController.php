<?php

namespace App\Http\Controllers;

use App\Models\PatientIntake;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; // Import Auth facade
use Illuminate\Support\Facades\Log;


class PatientIntakeController extends Controller
{
    public function index()
    {
        $userId = Auth::id(); 

        Log::info('Fetching patient intakes for user:', ['user_id' => $userId]); 

        // $intakes = Auth::user()->patientIntakes;
        $intakes = PatientIntake::all();

        Log::info('Fetched patient intakes:', ['intakes' => $intakes]);

        return response()->json($intakes);
    }
    

    public function create()
    {
        // You can return a view here if you want to create a form for creation
        return view('patientIntake.create'); 
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|uuid',  // Ensure user_id is a UUID
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'pets_name' => 'required|string',
            'question_1' => 'nullable|string',
            'question_2' => 'nullable|string',
            'question_3' => 'nullable|string',
            'question_4' => 'nullable|string',
            'question_5' => 'nullable|string',
            'question_6' => 'nullable|string',
            'question_7' => 'nullable|string',
            'question_8' => 'nullable|string',
            'question_9' => 'nullable|string',
            'question_10' => 'nullable|string',
            'question_11' => 'nullable|string',
        ]);
    
        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            // Use the user_id from the request, not Auth::id()
            $userId = $request->input('user_id');
    
            // Create the patient intake record with the validated data and the user_id
            $patientIntake = PatientIntake::create(array_merge($validator->validated(), ['user_id' => $userId]));
    
            // Return success response
            return response()->json(['message' => 'Record created successfully', 'data' => $patientIntake], 201);
        } catch (\Exception $e) {
            // Log the error and return a failure response
            logger()->error('Error creating patient intake:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to create record', 'details' => $e->getMessage()], 500);
        }
    }
    

    public function show($id)
    {
        $intake = PatientIntake::findOrFail($id);
        // You can return a view here to show the details of the intake
        return view('patientIntake.show', compact('intake')); 
    }

    public function edit($id)
    {
        $intake = PatientIntake::findOrFail($id);
        // You can return a view here to edit the intake
        return view('patientIntake.edit', compact('intake')); 
    }

    public function update(Request $request, $id)
    {
        $intake = PatientIntake::findOrFail($id);
        $intake->update($request->all());
        // You can redirect or return a response as needed
        return redirect()->route('patientIntake.index'); 
    }

    public function destroy($id)
    {
        PatientIntake::destroy($id);
        // You can redirect or return a response as needed
        return redirect()->route('patientIntake.index'); 
    }
}