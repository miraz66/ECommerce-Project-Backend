<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'company' => $this->company,
            'description' => $this->description,
            'discount' => $this->discount,
            'rating' => $this->rating,
            'image' => $this->isExternalImage($this->image) ? $this->image : Storage::url($this->image),
        ];
    }

    private function isExternalImage($url): bool
    {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }
}
