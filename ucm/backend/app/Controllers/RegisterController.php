<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;

class RegisterController extends Controller
{
    public function register()
    {
       
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email|is_unique[user.email]',
            'password' => 'required|min_length[8]',
            'first_name' => 'required|min_length[2]',
            'last_name' => 'required|min_length[2]',
            'cin' => 'required|min_length[1]'
        ]);
    
        if (!$validation->run((array)$this->request->getJSON())) {  // Cast the JSON object to an array
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }
    
        
        $userModel = new UserModel();
        $insertData = [
            //data from if it a json
            // 'email' => $this->request->getJSON()->email,
            // 'password' => password_hash($this->request->getJSON()->password, PASSWORD_BCRYPT), // Hash the password
            // 'first_name' => $this->request->getJSON()->first_name,
            // 'last_name' => $this->request->getJSON()->last_name,
            // 'cin' => $this->request->getJSON()->cin,
            // 'picture' => $this->request->getJSON()->picture 

            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT), 
            'first_name' => $this->request->getVar('first_name'),
            'last_name' => $this->request->getVar('last_name'),
            'cin' => $this->request->getVar('cin'),
            'picture' => $this->request->getVar('picture')
        ];
    
        if ($userModel->insert($insertData)) {
            // return userId
            return $this->response->setJSON(['status' => 'success', 'message' => 'User registered successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to register user']);
        }
    }
    
}
