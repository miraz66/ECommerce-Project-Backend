<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {

        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $cart = Cart::where('user_id', Auth::user()->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cart) {
            $cart->quantity += 1;
            $cart->save();
            return redirect()->back()->with('success', 'Product added to cart successfully!');
        }

        Cart::create([
            "user_id" => Auth::user()->id,
            "product_id" => $product->id,
            "name" => $product->name,
            "quantity" => 1,
            "price" => $product->price,
            "image" => $product->image,
            "company" => $product->company,
            "description" => $product->description,
            "discount" => $product->discount,
            "rating" => $product->rating,
        ]);

        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }

    // Remove product from cart
    public function removeFromCart(Request $request)
    {
        $cart = Cart::find($request->id);
        $cart->delete();
        return redirect()->back()->with('success', 'Product removed from cart successfully!');
    }
}
