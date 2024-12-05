<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateEventRequestsTable extends Migration
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
            'id_visitor' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'id_event' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'   => true,
            ],
            'status' => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
            ],
            'request_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'type' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('id_visitor', 'visitors', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('id_event', 'event', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('eventrequest');
    }

    public function down()
    {
        $this->forge->dropTable('eventrequest');
    }
}