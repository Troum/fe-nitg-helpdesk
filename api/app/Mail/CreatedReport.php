<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CreatedReport extends Mailable
{
    use Queueable, SerializesModels;

    public $mailSubject;
    public $mailClient;
    public $mailTemplate;
    public $ticketId;
    public $ticketResponsible;
    public $ticketStatus = null;


    /**
     * Create a new message instance.
     *
     * @param $mailSubject
     * @param $mailClient
     * @param $ticketId
     * @param $ticketStatus
     * @param $ticketResponsible
     * @param $mailTemplate
     */
    public function __construct($mailSubject, $mailClient, $ticketId, $ticketStatus, $ticketResponsible, $mailTemplate)
    {
        $this->mailSubject = $mailSubject;
        $this->mailClient = $mailClient;
        $this->ticketId = $ticketId;
        $this->ticketResponsible = $ticketResponsible;
        $this->mailTemplate = $mailTemplate;
        $this->ticketStatus = $ticketStatus;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_USERNAME'))
            ->subject($this->mailSubject)
            ->markdown($this->mailTemplate);
    }
}
