<?php

namespace App\Models;

use CodeIgniter\Model;

class EventRequestModel extends Model
{
    protected $table = 'eventrequest';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_visitor', 'id_event', 'status', 'request_date', 'type', 'created_at', 'updated_at'];
    
    public function getClub($requestId){
        $db = \Config\Database::connect();
        $builder = $db->table('eventrequest');
        $builder->select('club.name as club_name, club.id as club_id');
        $builder->join('club', 'club.id = eventrequest.id_club');
        $builder->where('eventrequest.id', $requestId);
        $query = $builder->get();
        return $query->getRow();
    }
    public function getVisitor($requestId){
        $db = \Config\Database::connect();
        $builder = $db->table('eventrequest');
        $builder->select('visitor.name as visitor_name, visitor.id as visitor_id');
        $builder->join('visitor', 'visitor.id = eventrequest.id_visitor');
        $builder->where('eventrequest.id', $requestId);
        $query = $builder->get();
        return $query->getRow();
    }
}
