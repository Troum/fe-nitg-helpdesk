<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!auth()->user()) {
            return response()->json(['error' => __('auth.token_expired'), 'text' => __('auth.login')], Response::HTTP_UNAUTHORIZED);
        }
        return $next($request);
    }
}
