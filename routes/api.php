<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});
Route::group(['middleware' => 'auth:api'], function() {
	Route::get('shops', 'ShopController@index');
	Route::get('shops/liked', 'ShopController@liked');
	Route::get('shops/like/{shop}', 'ShopController@like');
	Route::get('shops/dislike/{shop}', 'ShopController@dislike');
	Route::get('shops/remove/{shop}', 'ShopController@remove');
});

Route::get('islogged', 'Auth\LoginController@islogged');
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
