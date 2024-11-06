<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalesRequest;
use App\Models\Product;
use App\Models\Revenue;
use App\Models\Sales;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $sales = Sales::all();

        return inertia('Sales/Index', [
            'sales' => $sales
        ]);
    }

    public function create()
    {
        $products = Product::with('user')->get();
        return inertia('Sales/Create', [
            'products' => $products
        ]);
    }

    public function store(StoreSalesRequest $request)
    {
        // Loop through each sale item
        foreach ($request->saleItems as $item) {
            $product = Product::findOrFail($item['product_id']);

            if ($product->quantity >= $item['quantity']) {
                // Deduct stock and create sale record for each item
                $product->decrement('quantity', $item['quantity']);

                Sales::create([
                    'product_id' => $item['product_id'],
                    'user_id' => $product->user_id,
                    'name' => $product->name,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'image' => $product->image,
                    'description' => $product->description,
                ]);

                // Create revenue record for each item 10%
                $revenue = $product->price * $item['quantity'] * 0.1;

                Revenue::create([
                    'user_id' => $product->user_id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'revenue' => $revenue
                ]);
            } else {
                // Handle insufficient stock
                return redirect()->back()->with('error', 'Insufficient stock for this product.');
            }
        }

        return redirect('/sales/create')->with('success', 'Sales created successfully.');
    }
}
