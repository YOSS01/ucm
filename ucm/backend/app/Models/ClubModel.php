<?php
namespace App\Models;

use CodeIgniter\Model;

class ClubModel extends Model
{
    protected $table = 'clubs';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'id_president', 'email', 'name', 'description', 'logo', 'qr_code', 'status','slug','created_at' ,'background'];
   

}