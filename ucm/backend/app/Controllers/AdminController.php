<?php
namespace App\Controllers;
use App\Models\AdminModel;

class AdminController extends BaseController {

    public function addadmin() {
        $validation = \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required'
        ]);

        // Récupérer les données JSON
        $jsonData = $this->request->getJSON();

        if (!$validation->run((array) $jsonData)) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $admin = new AdminModel();

        $data = [
            'email' => $jsonData->email,
            'password' => password_hash($jsonData->password, PASSWORD_DEFAULT)
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

        if (!$validation->run($this->request->getPost())) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors()
            ]);
        }

        $adminModel = new AdminModel();
        $admin = $adminModel->where('email', $this->request->getJSON()->email)->first();
        if($admin){
            if(password_verify($this->request->getJSON()->password, $admin['password'])){
                $session = \Config\Services::session();
                $session->start();
                $session->set([
                    'admin_id' => $admin['id'],
                    'email' => $admin['email'],
                    'is_logged_in' => true
                ]);

                return $this->response->setJSON([
                    'status' => 'success',
                    'message' => 'Login successful',
                    'data' => [
                        'admin_id' => $session->get('admin_id'),
                        'email' => $session->get('email')
                    ]
                ]);
            }else{
                return $this->response->setJSON([
                    'status' => 'error',
                    'message' => 'Invalid email or password'
                ]);
            }
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
    
}


