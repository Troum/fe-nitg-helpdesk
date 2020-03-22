<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        try {
            $admin = new Admin();
            $admin->store($request);
            return $this->login($request);
        } catch(\Exception $exception) {
            return response()
                ->json(['error' => __('messages.error') . $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        return $this->attemptCredentials($credentials);

    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();
        return response()
            ->json(['success' => __('messages.success_logout')], Response::HTTP_OK);
    }

    /**
     * @return JsonResponse
     */
    public function me()
    {
        return response()
            ->json(['user' => auth()->user()], Response::HTTP_OK);
    }

    /**
     * @return JsonResponse
     */
    public function refresh()
    {
        if ($token = $this->guard()->refresh()) {
            return response()
                ->json(['success' => __('messages.token_refresh')], Response::HTTP_OK)
                ->header('Authorization', $token);
        }
        return response()
            ->json(['error' => __('messages.token_not_refreshed')], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @param $credentials
     * @return JsonResponse
     */
    private function attemptCredentials($credentials)
    {
        if (!$credentials) {
            return response()->json(['error' => __('auth.failed')], Response::HTTP_NOT_FOUND);
        }

        if ($token = $this->guard()->attempt($credentials)) {
            return response()
                ->json(['success' => __('messages.success_login')], Response::HTTP_OK)
                ->header('Authorization', $token);
        }

        return response()
            ->json(['error' => __('auth.failed')], Response::HTTP_NOT_FOUND);
    }

    /**
     * @return mixed
     */
    private function guard()
    {
        return Auth::guard();
    }
}
