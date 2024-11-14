<?php
namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;

class LoginController extends Controller
{
    public function login()
    {
       
        $validation =  \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required'
        ]);

        if (!$validation->run($this->request->getPost())) { // use json
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->getUserByEmail($this->request->getPost('email'));

        if ($user && password_verify($this->request->getPost('password'), $user['password'])) {
            
            $session = \Config\Services::session();
            $session->start();
            $session->set([
                'user_id' => $user['id'],
                'email' => $user['email'],
                'is_logged_in' => true
            ]);

           

            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'user_id' => $session->get('user_id'),
                    'email' => $session->get('email')
                ]
            ]);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Invalid email or password']);
        }
    }
}
