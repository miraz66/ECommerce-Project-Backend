<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sales>
 */
class SalesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'product_id' => Product::inRandomOrder()->value('id') ?? Product::factory(),
            'name' => $this->faker->name(),
            'quantity' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->numberBetween(100, 10000),
            'image' => $this->faker->imageUrl(),
            'description' => $this->faker->text(),
        ];
    }
}
