@component('mail::message')
# @lang('mails.greeting') {{ $mailClient }}

## @lang('mails.storing') <br>
### @lang('mails.ticket_id'): {{ $ticketId }}
### @lang('mails.responsible'): {{ $ticketResponsible }}<br>

@lang('mails.notice')

@lang('mails.thanks'),<br>
{{ config('app.name') }}
@endcomponent
