<?php
namespace App\Controllers;
use App\Models\AdminModel;
use App\Models\ClubModel;
use App\Models\UserModel;
use App\Models\EventModel;

class AdminController extends BaseController {

    public function addadmin() {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required'
        ]);

       
     

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $admin = new AdminModel();

        $data = [
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];

        if ($admin->insert($data)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Admin added successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to add admin'
            ]);
        }
    }


    public function login_admin(){
    
        $validation = \Config\Services::validation();
        $validation ->setRules([
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

        $adminModel = new AdminModel();
        $admin = $adminModel->where('email', $this->request->getJSON()->email)->first();
        if($admin && password_verify($this->request->getJSON()->password, $admin['password'])){
          
                $session = \Config\Services::session();
               
                $session->set([
                    'admin_id' => $admin['id'],
                    'email' => $admin['email'],
                    'is_logged_in' => true
                ]);

                return $this->response->setJSON([
                    
                    'status' => 'success',
                    'message' => 'Login successful',
                    'data' => [
                        'admin_id' => $session->get('admin_id')
                    
                    ]
                ]);
            }else{
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'Invalid email or password'
                ]);
            }
        

          

    }
  
    public function alladmins(){
        $adminModel = new AdminModel();
        $admins = $adminModel->findAll();
        return $this->response->setJSON($admins);
    }
    public function update_admin($id){
        $admin = new AdminModel();
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required'
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $data = [
            'email' => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT)
        ];

        if ($admin->update($id, $data)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Admin updated successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to update admin'
            ]);
        }

    }

    public function delete_admin($id){
        $admin = new AdminModel();
        if ($admin->delete($id)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Admin deleted successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to delete admin'
            ]);
        }
    }


    public function logout_admin(){
        $session = \Config\Services::session();
        $session->destroy();
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Logout successful'
        ]);
    }
    

    // Statistics
    public function statistics(){
        // Count Clubs
        $clubModel = new ClubModel();
        $clubs = $clubModel->countAllResults();
        
        // Count Users
        $userModel = new UserModel();
        $users = $userModel->countAllResults();
        
        // Count Events
        $eventModel = new EventModel();
        $events = $eventModel->countAllResults();

        return $this->response->setJSON( [
            'status' => 'success',
            'clubs' => $clubs,
            'users' => $users,
            'events' => $events
        ]);
    }
}


