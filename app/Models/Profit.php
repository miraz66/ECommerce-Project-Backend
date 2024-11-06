<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profit extends Model
{
    protected $table = 'profits';
    protected $fillable = ['product_id', 'user_id', 'profit', 'quantity', 'price'];
}
