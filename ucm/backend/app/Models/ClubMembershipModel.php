<?php

namespace App\Models;
use CodeIgniter\Model;

class ClubMembershipModel extends Model
{
    protected $table = 'clubmembership';
    protected $allowedFields = ['id_club', 'id_user', 'role', 'join_date', 'status', 'created_at', 'updated_at'];

    public function getClub($membershipId)
    {
        $db = \Config\Database::connect();
        $builder = $db->table('clubmembership');
        $builder->select('clubs.name as club_name, clubs.id as club_id, clubs.logo as club_logo');
        $builder->join('clubs', 'clubs.id = clubmembership.id_club');
        $builder->where('clubmembership.id', $membershipId);
        $query = $builder->get();
        return $query->getRow();
    }

    public function getUser($membershipId)
    {
        $db = \Config\Database::connect();
        $builder = $db->table('clubmembership');
        $builder->select('user.name as user_name, user.id as user_id');
        $builder->join('user', 'user.id = clubmembership.id_user');
        $builder->where('clubmembership.id', $membershipId);
        $query = $builder->get();
        return $query->getRow();
    }

    public function get_all_data()
    {
        $builder = $this->db->table('clubmembership');
        $query = $builder->get();
        return $query->getResultArray();
    }

}
