<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateClubMembershipTable extends Migration
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
            'id_club' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'id_user' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'role' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'join_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
              
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('id_club', 'clubs', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('id_user', 'user', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('clubmembership');
    }

    public function down()
    {
        $this->forge->dropTable('clubmembership');
    }
}