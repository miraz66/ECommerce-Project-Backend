<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ProductFilter
{
  protected $query;

  public function __construct($query)
  {
    $this->query = $query;
  }

  public static function apply($query, Request $request)
  {
    return (new static($query))->applyFilters($request);
  }

  public function applyFilters(Request $request)
  {
    // Apply search filter
    if ($search = $request->input('search')) {
      $this->query->where(
        function ($query) use ($search) {
          $query->where('name', 'like', '%' . $search . '%')
            ->orWhere('company', 'like', '%' . $search . '%')
            ->orWhere('price', 'like', '%' . $search . '%');
        }
      );
    }

    // Apply category filter
    if ($category = $request->input('category')) {
      $this->query->where(
        function ($query) use ($category) {
          $query->where('company', 'like', '%' . $category . '%')
            ->orWhere('quantity', 'like', '%' . $category . '%')
            ->orWhere('total_price', 'like', '%' . $category . '%');
        }
      );
    }

    // Apply minimum price filter
    if ($minPrice = $request->input('min_price')) {
      $this->query->where('price', '>=', $minPrice);
    }

    // Apply maximum price filter
    if ($maxPrice = $request->input('max_price')) {
      $this->query->where('price', '<=', $maxPrice);
    }

    return $this->query;
  }
}
