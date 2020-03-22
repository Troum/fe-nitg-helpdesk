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

Route::group([
    'prefix' => 'v1',
    'middleware' => ['api', 'assign.guard:user'],

], function ($router) {
    Route::group(['prefix' => 'auth'], function (){

        Route::resource('person', 'AdminController');

        Route::resource('ticket', 'TicketController');

        Route::get('emails', 'MailController@mails');

        Route::post('answer', 'MailController@answer');

        Route::post('login', 'AuthController@login');

        Route::post('logout', 'AuthController@logout');

        Route::post('refresh', 'AuthController@refresh');

        Route::post('me', 'AuthController@me');

    });
});

Route::group([
    'prefix' => 'v2',
    'middleware' => ['api', 'assign.guard:admin']
], function ($router) {

    Route::group(['prefix' => 'auth'], function (){

        Route::resource('ticket', 'TicketController');

        Route::resource('person', 'AdminController');

        Route::resource('client', 'UserController');

        Route::post('login', 'AdminAuthController@login');

        Route::post('logout', 'AdminAuthController@logout');

        Route::post('refresh', 'AdminAuthController@refresh');

        Route::post('me', 'AdminAuthController@me');

    });
});
