<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(100)->create();
        User::factory(1)->create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('password')]);
    }
}
