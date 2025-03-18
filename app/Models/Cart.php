<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $fillable = [
        "user_id",
        "product_id",
        "name",
        "quantity",
        "price",
        "image",
        "company",
        "description",
        "discount",
        "rating",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product_id()
    {
        return $this->belongsTo(Product::class);
    }
}
