<?php

namespace App\Models;

use CodeIgniter\Model;

class EventModel extends Model
{
    protected $table = 'event';
     protected $primaryKey = 'id';
    protected $allowedFields = ['id_club', 'name', 'description', 'location', 'date', 'picture', 'created_at'];
   

    public function getClub($eventId){
        $db = \Config\Database::connect();
        $builder = $db->table('event');
        $builder->select('club.name as club_name, club.id as club_id');
        $builder->join('club', 'club.id = event.id_club');
        $builder->where('event.id', $eventId);
        $query = $builder->get();
        return $query->getRow();
    }
    
}
