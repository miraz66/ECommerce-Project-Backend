<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Views;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::latest();
        $products = ProductResource::collection($query->paginate(10));

        return inertia('Product/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $imageName = $request->hasFile('image') ? $request->file('image')
            ->store('images', 'public') : null;

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'company' => $request->company,
            'description' => $request->description,
            'image' => $imageName
        ]);

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        // Log the view
        if (Auth::check()) {
            if (Views::where('user_id', Auth::user()->id)->where('product_id', $product->id)->exists()) {
                Views::where('user_id', Auth::user()->id)->where('product_id', $product->id)->increment('count');
            } else {
                Views::create([
                    'user_id' => Auth::user()->id,
                    'product_id' => $product->id,
                    'count' => 1
                ]);
            }
        } else {
            // Optionally handle guest views if needed
        }

        return inertia('Product/Show', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return inertia('Product/Edit', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        dd($request->all());
        // Find the product by ID or fail
        $product = Product::findOrFail($id);

        // Update product data
        $product->update($request->all());

        // // Update product data
        // $product->update([
        //     'name' => $request->name,
        //     'price' => $request->price,
        //     'quantity' => $request->quantity,
        //     'company' => $request->company,
        //     'description' => $request->description,
        // ]);

        // // Handle image upload if a new image is provided
        // if ($request->hasFile('image')) {
        //     $imageName = $request->file('image')->store('images', 'public');
        //     $product->update(['image' => $imageName]);
        // }



        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
