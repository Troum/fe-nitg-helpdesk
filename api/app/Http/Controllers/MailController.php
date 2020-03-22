<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Traits\SystemTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class MailController extends Controller
{
    use SystemTrait;

    /**
     * @return JsonResponse
     */
    public function mails()
    {
        return response()->json(['emails' => $this->fetch()], Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function answer(Request $request)
    {
        if ($this->createEmail($request)) {
            return response()->json(['success' => 'Mail was successfully send!', 'emails' => $this->fetch()], Response::HTTP_OK);
        }
        else {
            return response()->json(['error' => 'Something went wrong!'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * @return array
     */
    private function fetch()
    {
        $fetched = Email::whereClientEmail(auth()->user()->email)->get();
        $mails = [];
        if(count($fetched) > 0) {
            foreach ($fetched as $mail) {
                array_push($mails, [
                    'ticket_id' => $mail->ticket_id,
                    'email' => $mail->client_email,
                    'messages' => $this->deserializeMessage($mail->message)
                ]);
            }
        }


        return $mails;
    }
}
