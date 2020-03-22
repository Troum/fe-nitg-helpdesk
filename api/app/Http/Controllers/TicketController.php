<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Mail\CreatedReport;
use App\Models\Admin;
use App\Models\Ticket;
use App\Traits\SystemTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class TicketController extends Controller
{
    use SystemTrait;
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json(['tickets' => $this->fetch()], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $ticket = Ticket::create([
            'subject' => $request->subject,
            'responsible' => $request->responsible,
            'client' => auth()->user()->name,
            'category' => $request->category,
            'priority' => $request->priority,
            'time' => $this->setTime($request->priority),
            'description' => $request->description
        ]);

        $ticket->chatting()->create([
           'ticket_id' => $ticket->id,
            'client_email' => auth()->user()->email,
            'message' => $this->serializeMessage($this->setSubject($request->subject), $this->setMessage(__('messages.subject')))
        ]);

        try {
            Mail::to(auth()->user()->email)->send(new CreatedReport(
                $this->setSubject(__('messages.subject')), auth()->user()->name, $ticket->id, null, $ticket->responsible, $this->setTemplate('mail/created-report')));
            Mail::to(Admin::whereId($request->id)->first()->email)->send(
                new CreatedReport(
                    $this->setSubject(__('messages.admin_subject')), Admin::whereId($request->id)->first()->name, $ticket->id, null, $ticket->client, $this->setTemplate('mail/created-report-to-admin'))
            );
            event(new MessageEvent(__('messages.admin_message')));
            return response()->json(['success' => __('messages.successfully_added')], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  Ticket  $ticket
     * @return Response
     */
    public function show(Ticket $ticket)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Ticket  $ticket
     * @return Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Ticket  $ticket
     * @return Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        $request->request->add(['id' => $ticket->id]);

        $ticket->update([
           'status' => $request->status
        ]);
        if($this->createEmail($request)) {
            try {
                Mail::to($ticket->chatting->client_email)->send(new CreatedReport(
                    $request->subject, $ticket->client, $ticket->id, $ticket->status, $ticket->responsible, $this->setTemplate('mail/change-report')));
                return response()->json(['success' => __('messages.successfully_send'), 'tickets' => $this->fetch()], Response::HTTP_OK);
            } catch (\Exception $exception) {
                return response()->json(['error' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            return response()->json(['error' => __('messages.something_wrong')], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Ticket  $ticket
     * @return Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }

    /**
     * @return array
     */
    private function fetch()
    {
        $fetched = Ticket::all()->sortByDesc('created_at');
        $tickets = [];
        foreach ($fetched as $item) {
            array_push($tickets, [
                'id' => $item->id,
                'responsible' => $item->responsible,
                'subject' => $item->subject,
                'client' => $item->client,
                'category' => $this->changeType($item->category),
                'description' => $item->description,
                'created_at' => $item->created_at,
                'status' => $item->status,
                'bill' => $item->bill,
                'time' => $item->time,
                'emails' => $this->deserializeMessage($item->chatting->message)
            ]);
        }

        return $tickets;
    }
}
