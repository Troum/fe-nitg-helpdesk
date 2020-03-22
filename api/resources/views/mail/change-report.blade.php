@component('mail::message')
# @lang('mails.greeting'), {{ $mailClient }}

## @lang('mails.changing'). <br>
### @lang('mails.status'): {{ $ticketStatus }} <br>
### @lang('mails.ticket_id'): {{ $ticketId }}
### @lang('mails.responsible'): {{ $ticketResponsible }}<br>

@lang('mails.message') <b>@lang('mails.inbox')</b>

@component('mail::button', ['url' => config('app.url')])
    @lang('mails.login')
@endcomponent

@lang('mails.thanks'),<br>
{{ config('app.name') }}
@endcomponent
