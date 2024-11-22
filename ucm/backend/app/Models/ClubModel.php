<?php
namespace App\Models;

use CodeIgniter\Model;

class ClubModel extends Model
{
    protected $table = 'clubs';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'id_president', 'name', 'description', 'logo', 'background', 'qr_code', 'status','slug','created_at' ];
   

}