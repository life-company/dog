<?php

use App\Http\Controllers\DogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::post('/dogs_create', function () {
//     return response()->json(['message' => 'Data received successfully'], 200);
// });
Route::post('/dogs_create', [DogController::class, 'store']);
