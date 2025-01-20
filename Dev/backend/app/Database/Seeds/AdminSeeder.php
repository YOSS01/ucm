<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'email'      => 'administrator@uiz.ac.ma',
            'password'   => password_hash('adminadmin', PASSWORD_DEFAULT),
        ];

        // Insert data into the table
        $this->db->table('admin')->insert($data);
    }
}
