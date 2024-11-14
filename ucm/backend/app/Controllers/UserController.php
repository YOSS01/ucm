<?php

namespace App\Controllers;
use App\Models\UserModel;

class UserController extends BaseController
{
    public function index()
    {
        // return view('');
    }

    public function allusers(){
        $userModel = new UserModel();
        $users = $userModel->findAll();
         return $this->response->setJSON($users);
    }

    // get user()
}
