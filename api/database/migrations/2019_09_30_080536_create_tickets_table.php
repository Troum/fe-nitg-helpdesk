<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('responsible');
            $table->longText('subject');
            $table->longText('client');
            $table->longText('category');
            $table->text('priority');
            $table->string('time');
            $table->string('status', 256)->default(__('messages.default_status'));
            $table->longText('description');
            $table->string('bill', 1024)->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
}
