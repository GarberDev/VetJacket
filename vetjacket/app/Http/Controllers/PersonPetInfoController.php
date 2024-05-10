<?php

namespace App\Http\Controllers;

use App\Models\PersonPetInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PersonPetInfoController extends Controller
{
    public function index()
    {        
        $info = Auth::user()->personPetInfos; // Fetch info related to the authenticated user
        // $info = PersonPetInfo::all();
        return response()->json($info);
    }

    public function create()
    {
        return view('personPetInfo.create');
    }
    // public function store(Request $request)
    // {
    //     dd($request);
    //     logger()->info('Received data:', $request->all());

    //     PersonPetInfo::create($request->all());
        
    //     return redirect()->route('personPetInfo.index');
    // }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'primary_cell_number' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email',
            'pets_name' => 'required|string',
            'pets_species' => 'required|string',
            'pet_color' => 'required|string', 
            'pet_age' => 'required|integer', 
            'pet_gender' => 'required|string',
            'city' => 'required|string',   
            'zipCode' => 'required|string',
            'user_id' => 'required|uuid',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $personPetInfo = PersonPetInfo::create($validator->validated());
            return response()->json(['message' => 'Record created successfully', 'data' => $personPetInfo], 201);
        } catch (\Exception $e) {
            logger()->error('Error creating person-pet info:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to create record', 'details' => $e->getMessage()], 500);
        }
    }
    
    
    
    public function show($id)
    {
        $info = PersonPetInfo::findOrFail($id);
        return view('personPetInfo.show', compact('info'));
    }

    public function edit($id)
    {
        $info = PersonPetInfo::findOrFail($id);
        return view('personPetInfo.edit', compact('info'));
    }

    public function update(Request $request, $id)
    {
        $info = PersonPetInfo::findOrFail($id);
        $info->update($request->all());
        return redirect()->route('personPetInfo.index');
    }

    public function destroy($id)
    {
        PersonPetInfo::destroy($id);
        return redirect()->route('personPetInfo.index');
    }
}
