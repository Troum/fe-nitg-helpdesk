@component('mail::message')
# @lang('mails.greeting'), {{ $mailClient }}

## @lang('mails.task') <br>
### @lang('mails.ticket_id'): {{ $ticketId }}
### @lang('mails.client'): {{ $ticketResponsible }}<br>

@lang('mails.message_admin')

@component('mail::button', ['url' => config('app.url') . '/admin'])
    @lang('mails.login')
@endcomponent

@lang('mails.thanks'),<br>
{{ config('app.name') }}
@endcomponent
