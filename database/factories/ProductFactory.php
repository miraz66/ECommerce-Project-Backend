<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(20, 200),
            'quantity' => $this->faker->numberBetween(0, 100),
            'image' => "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            'company' => $this->faker->company(),
            'discount' => $this->faker->numberBetween(2, 40),
            'rating' => $this->faker->numberBetween(1, 5),
        ];
    }
}
