<?php

namespace App\Controllers;
use App\Models\AdminModel;
use App\Models\UserModel;

class UserController extends BaseController
{
    public function index()
    {
        // return view('');
    }


   public function updateUser($id){
 
    $validation = \Config\Services::validation();
    $validation->setRules([
        'email' => 'required|valid_email|is_unique[user.email]',
        'password' => 'required|min_length[8]',
        'first_name' => 'required|min_length[2]',
        'last_name' => 'required|min_length[2]',
        'cin' => 'required|min_length[1]|is_unique[user.cin]',
        'puicture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]'
    ]);


    if(!$validation->withRequest($this->request)->run()){
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $validation->getErrors()
        ]);
    }
      
   
    $userModel = new UserModel();
    $picture = $this->request->getFile('user_picture');
    if($picture->isValid() && !$picture->hasMoved()){
        $picture->move(WRITEPATH . 'uploads/');
        $picturePath = $picture->getName();

    }else{
        return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload picture']);

    }
    $data = [

        'email' => $this->request->getVar('email'),
        'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT), 
        'first_name' => $this->request->getVar('first_name'),
        'last_name' => $this->request->getVar('last_name'),
        'cin' => $this->request->getVar('cin'),
        'picture' => $picturePath,
        'created_at' => date('Y-m-d H:i:s')
    ];
    if($userModel->update($id, $data)){
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'User updated successfully'
        ]);

   }}

    public function allusers(){
        $userModel = new UserModel();
        $users = $userModel->findAll();
         return $this->response->setJSON($users);
    }
    public function login()
    {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required'
        ]);

        if (!$validation->run((array)$this->request->getJSON())) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $userModel = new UserModel();
        $user = $userModel->where('email', $this->request->getJSON()->email)->first();

        if ($user && password_verify($this->request->getJSON()->password, $user['password'])) {
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
 
  
    public function register()
    {
       
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email|is_unique[user.email]',
            'password' => 'required|min_length[8]',
            'first_name' => 'required|min_length[2]',
            'last_name' => 'required|min_length[2]',
            'cin' => 'required|min_length[1]|is_unique[user.cin]',
             'puicture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]'
        ]);
    
        if (!$validation->run((array)$this->request->getJSON())) {  
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }
    
        
        $userModel = new UserModel();
        $picture = $this->request->getFile('user_picture');
        if($picture->isValid() && !$picture->hasMoved()){
            $picture->move(WRITEPATH . 'uploads/');
            $picturePath = $picture->getName();
    
        }else{
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload picture']);
    
        }
        $insertData = [
      

            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT), 
            'first_name' => $this->request->getVar('first_name'),
            'last_name' => $this->request->getVar('last_name'),
            'cin' => $this->request->getVar('cin'),
            'picture' => $picturePath,
            'created_at' => date('Y-m-d H:i:s'),
        ];
    
        if ($userModel->insert($insertData)) {
            
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user_id' => $userModel->getInsertID()
        ]);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to register user']);
        }
    }
    
   


    public function getuserByid($id){
        $user = new UserMOdel();
        $user = $user->find($id);
        return $this->response->setJSON($user);
    }
}