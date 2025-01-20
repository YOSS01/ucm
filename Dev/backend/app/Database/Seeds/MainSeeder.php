<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class MainSeeder extends Seeder
{
    public function run()
    {
        $this->call('AdminSeeder');
        $this->call('UserSeeder');
        $this->call('ClubSeeder');
        $this->call('EventSeeder');
    }
}
