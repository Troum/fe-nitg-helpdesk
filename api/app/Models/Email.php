<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    /**
     * The attributes to protect dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at', 'updated_at'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ticket_id', 'client_email', 'message'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
