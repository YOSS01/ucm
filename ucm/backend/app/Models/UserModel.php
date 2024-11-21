<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'user';
    protected $primaryKey = 'id';
    protected $allowedFields = ['email', 'password', 'first_name', 'last_name', 'cin', 'picture','created_at' ,'reset_token', 'reset_expires'];

  
}
