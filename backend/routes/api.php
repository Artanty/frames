<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', 'Auth\UserAuthController@register');
Route::post('login', 'Auth\UserAuthController@login');
Route::post('logout', 'Auth\UserAuthController@logout');
Route::post('getUser', 'Auth\UserAuthController@getUser');


// Route::post('register', 'Auth\UserAuthController@register');
Route::post('upload_image','FileUploadController@store'); //->middleware('auth:api');
// Route::get('upload_image','UploadController@upload');
Route::resource('folder', 'FolderController');
