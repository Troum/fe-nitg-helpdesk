<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ticket extends Model
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
        'subject',
        'responsible',
        'client',
        'category',
        'priority',
        'description',
        'status',
        'time',
        'bill'
    ];


    /**
     * @return HasOne
     */
    public function chatting()
    {
        return $this->hasOne(Email::class, 'ticket_id');
    }

}
