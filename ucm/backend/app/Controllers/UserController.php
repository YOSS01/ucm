<?php

namespace App\Controllers;
use App\Models\AdminModel;
use App\Models\UserModel;
use App\Models\ClubMembershipModel;

class UserController extends BaseController
{
    public function index()
    {
        // return view('');
    }


   public function updateUser($id){
 
    $validation = \Config\Services::validation();
    $validation->setRules([
        'password' => 'min_length[8]',
        'first_name' => 'min_length[2]',
        'last_name' => 'min_length[2]',
       'puicture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]',
       'email' => 'valid_email|is_unique[user.email]',
       'cin' => 'min_length[1]|is_unique[user.cin]'
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
     
        'picture' => $picturePath
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
            'cin' => 'required|min_length[1]|is_unique[user.cin]'
        ]);
    
        if (!$validation->run((array)$this->request->getJSON())) {  
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }
    
        
        $userModel = new UserModel();
        
        $insertData = [
      

            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT), 
            'first_name' => $this->request->getVar('first_name'),
            'last_name' => $this->request->getVar('last_name'),
            'cin' => $this->request->getVar('cin'),
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
        $userModel = new UserModel();
        $clubMembershipModel = new ClubMembershipModel();
        $user = $userModel->find($id);
        $clubs = $clubMembershipModel->where('id_user', $id)->findAll();
        $userData = [
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email'],
            'picture' => $user['picture'],
            'clubs' => $clubs
        ];
    
        return $this->response->setJSON($userData);
    }

    // public function forgetPassword($req){

    //     $userModel = new UserModel();

   
    //     $user = $userModel->where('email', $req->getVar('email'))->first();
    //     if($user){

    //         $token = bin2hex(random_bytes(50));
    //         $userModel->update($user['id'], ['reset_token' => $token, 'reset_token_expiry' => date('Y-m-d H:i:s', strtotime('+1 hour'))]);

    //         $email = \Config\Services::email();
    //         $email->setTo($user['email']);
    //         $email->setSubject('Password Reset Request');
    //         $email->setMessage("Click the link to reset your password: " . base_url("reset-password?token={$token}"));

    //         if ($email->send()) {
    //             return $this->response->setJSON(['status' => 'success', 'message' => 'Password reset email sent']);
    //         } else {
    //             return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to send password reset email']);
    //         }
    //     }

    // }

   
}