<?php

namespace App\Traits;

use App\Models\Email;
use Carbon\Carbon;

trait SystemTrait
{
    public $message;
    public $subject;
    public $mailsTemplates;
    /**
     * @param $priority
     * @return bool|string
     */
    public function setTime($priority)
    {

        switch ($priority) {
            case '1':
                return '10';
            case '2':
                return '8';
            case '3':
                return '4';
            case '4':
                return '2';
        }

        return false;
    }

    /**
     * @param $type
     * @return string
     */
    public function changeType($type)
    {
        if(app()->getLocale() === 'en') {
            switch ($type) {
                case '1':
                    return 'Support';
                case '2':
                    return 'Request';
                case '3':
                    return 'Order';
            }
        }
        elseif(app()->getLocale() === 'ru') {
            switch ($type) {
                case '1':
                    return 'Поддержка';
                case '2':
                    return 'Запрос';
                case '3':
                    return 'Поручение';
            }
        }

    }

    /**
     * @param $subject
     * @param $message
     * @return false|string
     */
    public function serializeMessage($subject, $message)
    {
        $array = [];
        array_push($array, [
            'from' => auth()->user()->name,
            'subject' => $subject,
            'message' => $message,
            'date' => Carbon::now()
        ]);
        return json_encode($array);
    }

    /**
     * @param $string
     * @return mixed
     */
    public function deserializeMessage($string)
    {
        return json_decode($string, true);
    }

    /**
     * @param $request
     * @return bool
     */
    public function createEmail($request)
    {
        $email = Email::whereTicketId($request->id)->first();
        if($email) {
            $array = $this->deserializeMessage($email->message);
            array_push($array, [
                'from' => auth()->user()->name,
                'subject' => $request->subject,
                'message' => $request->message,
                'date' => Carbon::now()
            ]);
            $email->update([
                'message' => json_encode($array)
            ]);
            return true;
        } else {

            Email::create([
                'client_email' => auth()->user()->email,
                'ticket_id' => $request->id,
                'message' =>  $this->serializeMessage($request->subject, $request->message),
            ]);

            return true;
        }

        return false;

    }

    public function setTemplate($template)
    {
        $this->mailsTemplates = new \stdClass();
        $this->mailsTemplates->template = $template;
        return $this->mailsTemplates->template;
    }

    public function setSubject($subject)
    {
        $this->subject = new \stdClass();
        $this->subject->subject = $subject;
        return $this->subject->subject;
    }

    public function setMessage($message)
    {
        $this->message = new \stdClass();
        $this->message->message = $message;
        return $this->message->message;
    }
}
