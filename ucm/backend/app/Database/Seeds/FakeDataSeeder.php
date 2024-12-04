<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;

class FakeDataSeeder extends Seeder
{
    public function run()
    {
        $faker = Factory::create();

        // Insert data into the 'admin' table
        $this->db->table('admin')->insert([
            'email' => $faker->unique()->email,
            'password' => password_hash('password123', PASSWORD_BCRYPT),
            'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
        ]);

        // Insert data into the 'users' table
        for ($i = 0; $i < 10; $i++) {
            $this->db->table('user')->insert([
                'email' => $faker->unique()->email,
                'password' => password_hash('password123', PASSWORD_BCRYPT),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'cin' => $faker->unique()->numerify('#########'),
                'picture' => 'cappuccino_1.png',
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
                'reset_token' => $faker->optional()->uuid,
                'reset_expires' => $faker->optional()->dateTimeThisMonth ? $faker->dateTimeThisMonth->format('Y-m-d H:i:s') : null,
            ]);
        }

        // Insert data into the 'visitors' table
        for ($i = 0; $i < 5; $i++) {
            $this->db->table('visitors')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
            ]);
        }

        // Insert data into the 'clubs' table
        for ($i = 0; $i < 3; $i++) {
            $this->db->table('clubs')->insert([
                'id_president' => $faker->numberBetween(1, 10),
                'name' => $faker->company,
                'description' => $faker->text(200),
                'logo' => 'cappuccino_1.png',
                'background' => 'cappuccino_1.png',
                'qr_code' => $faker->uuid,
                'status' => $faker->randomElement(['active', 'inactive']),
                'slug' => $faker->slug,
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
            ]);
        }

        // Insert data into the 'events' table
        for ($i = 0; $i < 5; $i++) {
            $this->db->table('event')->insert([
                'id_club' => $faker->numberBetween(1, 3),
                'name' => $faker->word,
                'description' => $faker->text(100),
                'location' => $faker->address,
                'picture' => 'cappuccino_1.png',
                'date' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
            ]);
        }

        // Insert data into the 'clubmembership' table
        for ($i = 0; $i < 5; $i++) {
            $this->db->table('clubmembership')->insert([
                'id_club' => $faker->numberBetween(1, 3),
                'id_user' => $faker->numberBetween(1, 10),
                'id_event' => $faker->numberBetween(1, 5),
                'role' => $faker->randomElement(['member', 'admin', 'leader']),
                'join_date' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
                'status' => $faker->randomElement(['active', 'inactive']),
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
            ]);
        }

        // Insert data into the 'eventrequests' table
        for ($i = 0; $i < 5; $i++) {
            $this->db->table('eventrequest')->insert([
                'id_visitor' => $faker->numberBetween(1, 5),
                'id_event' => $faker->numberBetween(1, 5),
                'status' => $faker->randomElement(['pending', 'approved', 'rejected']),
                'request_date' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
                'created_at' => $faker->optional()->dateTimeThisYear ? $faker->dateTimeThisYear->format('Y-m-d H:i:s') : null,
            ]);
        }

        echo "Fake data inserted successfully.\n";
    }
}
