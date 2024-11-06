<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'price',
        'quantity',
        'revenue'
    ];
}
