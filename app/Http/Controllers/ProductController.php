<?php

namespace App\Http\Controllers;

use App\Filters\ProductFilter;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Views;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::latest();

        $filteredQuery = ProductFilter::apply($query, request());

        $products = ProductResource::collection($filteredQuery->paginate(20));


        return inertia('Product/Index', [
            'products' => $products,
            'filters' => request()->all(['search', 'category', 'min_price', 'max_price']),
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
            'user_id' => Auth::id(),
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'company' => $request->company,
            'description' => $request->description,
            'image' => $imageName,
            'discount' => $request->discount,
            'rating' => rand(0, 5),
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
        // Find the product by ID or fail
        $product = Product::findOrFail($id);

        // Update product data
        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'company' => $request->company,
            'description' => $request->description,
        ]);

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            $imageName = $request->file('image')->store('images', 'public');
            $product->update(['image' => $imageName]);
        }



        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        return redirect()->route('products.index')->with('success', 'Product and image deleted successfully.');
    }
}
