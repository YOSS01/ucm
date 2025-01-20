<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        //
        $multipleData = [
            [
                'first_name' => 'Youssef',
                'last_name'  => 'Alahyane',
                'cin' => 'JMXXXXX',
                'picture' => '464765111_8601337266626257_7058829962203866209_n.jpg',
                'email'      => 'alahyane.yo@gmail.com',
                'password'   => password_hash('useruser', PASSWORD_DEFAULT),
            ],
            [
                'first_name' => 'April',
                'last_name'  => 'Rodriguez',
                'cin' => 'ADXXXXX',
                'picture' => 'photo-1499557354967-2b2d8910bcca_1732479941.webp',
                'email'      => 'tobavaba@mailinator.com',
                'password'   => password_hash('useruser', PASSWORD_DEFAULT),
            ],
            [
                'first_name' => 'Laura',
                'last_name'  => 'Gregory',
                'cin' => 'NDXXXXX',
                'picture' => 'photo-1522228115018-d838bcce5c3a.avif',
                'email'      => 'tifydoso@mailinator.com',
                'password'   => password_hash('useruser', PASSWORD_DEFAULT),
            ],
            [
                'first_name' => 'Fredericka',
                'last_name'  => 'Vazquez',
                'cin' => 'FAXXXXX',
                'picture' => 'photo-1535713875002-d1d0cf377fde_1732539949.avif',
                'email'      => 'wyrod@mailinator.com',
                'password'   => password_hash('useruser', PASSWORD_DEFAULT),
            ],
            [
                'first_name' => 'Vance',
                'last_name'  => 'Hendricks',
                'cin' => 'MDXXXXX',
                'picture' => 'photo-1532074205216-d0e1f4b87368_1732539383.avif',
                'email'      => 'tyfy@mailinator.com',
                'password'   => password_hash('useruser', PASSWORD_DEFAULT),
            ],
        ];

        $this->db->table('user')->insertBatch($multipleData);
    }
}
