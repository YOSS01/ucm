<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'email' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
                'unique' => true,
            ],
            'password' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
            ],
            'first_name' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
            ],
            'last_name' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
            ],
            'cin' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
                'unique' => true,
            ],
            'picture' => [
                'type'       => 'VARCHAR',
                'constraint' => '150',
                'null'       => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('user');
    }

    public function down()
    {
        $this->forge->dropTable('user');
    }
}