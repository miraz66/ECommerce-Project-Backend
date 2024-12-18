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
            'price' => $this->faker->numberBetween(100, 10000),
            'quantity' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(),
            'company' => $this->faker->company(),
        ];
    }
}
