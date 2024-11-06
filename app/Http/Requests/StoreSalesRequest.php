<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSalesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'saleItems' => ['required', 'array'], // Expect an array of sale items
            'saleItems.*.product_id' => ['required', 'numeric', 'exists:products,id'],
            'saleItems.*.quantity' => ['required', 'numeric', 'min:1'],
        ];
    }

    /**
     * Get custom error messages for validation failures.
     */
    public function messages(): array
    {
        return [
            'saleItems.required' => 'Please Add at least one sale item.',
            'saleItems.*.medicine_id.required' => 'Medicine id is required for each sale item.',
            'saleItems.*.medicine_id.exists' => 'The selected medicine does not exist.',
            'saleItems.*.quantity.required' => 'Quantity is required for each sale item.',
            'saleItems.*.quantity.min' => 'Quantity must be at least 1.',
            'saleItems.*.total_price.required' => 'Total price is required for each sale item.',
        ];
    }
}
