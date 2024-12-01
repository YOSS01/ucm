<?php

namespace App\Controllers;
use App\Models\ClubModel;
use App\Models\UserModel;
use App\Models\ClubMembershipModel;

use CodeIgniter\Email\Email;
use CodeIgniter\I18n\Time;

class UserController extends BaseController
{
    public function index()
    {
        // return view('');
    }


    public function updateUser($id)
    {
        $validation = \Config\Services::validation();

        // Define validation rules (all fields optional but validated if provided)
        $validation->setRules([
            'email' => 'permit_empty|valid_email|max_length[255]',
            'first_name' => 'permit_empty|string|max_length[255]',
            'last_name' => 'permit_empty|string|max_length[255]',
            'password' => 'permit_empty|min_length[8]',
            'picture' => 'permit_empty|uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg,avif,webp]',
            'cin' => 'permit_empty|string|min_length[2]',
        ]);

        // Validate the incoming data
        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }

        $userModel = new UserModel();

        // Check if the user exists
        $user = $userModel->find($id);
        if (!$user) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'User not found']);
        }

        // Prepare data for update
        $data = [];
        $fields = ['email', 'first_name', 'last_name', 'password', 'cin'];
        foreach ($fields as $field) {
            $value = $this->request->getVar($field);
            if (!is_null($value)) {
                $data[$field] = $field === 'password' ? password_hash($value, PASSWORD_BCRYPT) : $value;
            }
        }

        // Handle picture upload if provided
        $picture = $this->request->getFile('picture');
        if ($picture && $picture->isValid() && !$picture->hasMoved()) {
            $picture->move(FCPATH . 'uploads/users/');
            $data['picture'] = $picture->getName();
        }

        // Update user
        if (!empty($data) && $userModel->update($id, $data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'User updated successfully']);
        }

        return $this->response->setJSON(['status' => 'error', 'message' => 'No changes made or update failed']);
    }


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
    
        if (!$validation->withRequest($this->request)->run()) {  
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

       // Handle optional picture upload
        $picture = $this->request->getFile('picture');
        if ($picture && $picture->isValid() && !$picture->hasMoved()) {
            // Get the original file name and extension
            $originalName = $picture->getName();
            $fileExtension = $picture->getExtension();
    
            // Generate a new filename with dynamic text (e.g., a timestamp)
            $newFileName = pathinfo($originalName, PATHINFO_FILENAME) . '_' . time() . '.' . $fileExtension;
    
            // Move the file with the new name
            $picture->move(FCPATH . 'uploads/users/', $newFileName);
    
            // Save the new filename in the database
            $insertData['picture'] = $newFileName;
        }
    
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
    public function getuserByid($id)
    {
        $userModel = new UserModel();
        $clubMembershipModel = new ClubMembershipModel();
        
        

        $user = $userModel->find($id);
        if (!$user) {
         
            return $this->response->setJSON(['status' => 'error', 'message' => 'User not found'], 404);
        }
    
       
        $memberships = $clubMembershipModel->where('id_user', $id)->findAll();
      
        $clubs = [];
        foreach ($memberships as $membership) {
            $clubDetails = $clubMembershipModel->getClub($membership['id']);
            if ($clubDetails) {
                $clubs[] = [
                    'membership_id' => $membership['id'],
                    'club_id' => $clubDetails->club_id,
                    'club_name' => $clubDetails->club_name,
                    'role' => $membership['role'],
                    'join_date' => $membership['join_date'],
                    'status' => $membership['status'],
                    'logo' => $clubDetails->club_logo
                ];
            }
        }
    
       
        $userData = [
            'id' => $user['id'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'cin' => $user['cin'],
            'email' => $user['email'],
            'picture' => $user['picture'],
            'clubs' => $clubs
        ];
    
        return $this->response->setJSON($userData);
    }
    public function requestPasswordReset()
    {
        $email = $this->request->getVar('email');
    
        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();
    
        if (!$user) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Email not found']);
        }
    
        $token = bin2hex(random_bytes(16));
        $userModel->update($user['id'], ['reset_token' => $token, 'reset_expires' => Time::now()->addHours(1)]);
    
        $resetLink = site_url("/resetPassword?token=$token");
        $emailService = \Config\Services::email();
        $emailService->setTo($email);
        $emailService->setFrom('from', 'name'); // Set the "From" and "name" 
        $emailService->setSubject('Password Reset');
        $emailService->setMessage("Click the following link to reset your password: $resetLink");
    
        if ($emailService->send()) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Password reset link sent to your email']);
        } else {
            $error = $emailService->printDebugger(['headers']);
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to send email', 'error' => $error]);
        }
    }

    // public function resetPassword()
    // {
    //     $token = $this->request->getGet('token');
    //     $newPassword = $this->request->getPost('new_password');

    //     if (!$token || !$newPassword) {
    //         return $this->response->setJSON(['status' => 'error', 'message' => 'Invalid request']);
    //     }

    //     $userModel = new UserModel();
    //     $user = $userModel->where('reset_token', $token)->first();

    //     if (!$user || Time::now()->isAfter($user['reset_expires'])) {
    //         return $this->response->setJSON(['status' => 'error', 'message' => 'Invalid or expired token']);
    //     }

       
    //     $userModel->update($user['id'], ['password' => password_hash($newPassword, PASSWORD_DEFAULT), 'reset_token' => null, 'reset_expires' => null]);

    //     return $this->response->setJSON(['status' => 'success', 'message' => 'Password has been reset successfully']);
    // }

    public function deleteUser($id) {
        $userModel = new UserModel();

        if ($userModel->delete($id)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'User has been deleted successfully',
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to delete the user. Please try again.',
            ]);
        }
    }
    

    public function getClubUsers($id)
    {
        $clubModel = new ClubModel();
        $clubMembershipModel = new ClubMembershipModel();
        $userModel = new UserModel();
    
        $club = $clubModel->find($id);
        if (!$club) {
            log_message('error', 'Club not found: ' . $id);
            return $this->response->setJSON(['status' => 'error', 'message' => 'Club not found'], 404);
        }
    
        
        $memberships = $clubMembershipModel->where('id_club', $id)->findAll();
        if (!$memberships) {
            log_message('error', 'No memberships found for club: ' . $id);
        }
        $users = [];
        foreach ($memberships as $membership) {
            $userDetails = $userModel->find($membership['id_user']);
            if ($userDetails) {
                $users[] = [
                    'membership_id' => $membership['id'],
                    'user_id' => $userDetails['id'],
                    'name' => $userDetails['first_name'] . ' ' . $userDetails['last_name'],
                    'email' => $userDetails['email'],
                    'picture' => $userDetails['picture'],
                    'role' => $membership['role'],
                    'join_date' => $membership['join_date'],
                    'status' => $membership['status']
                ];
            } else {
                log_message('error', 'User details not found for membership: ' . $membership['id']);
            }
        }
    
        return $this->response->setJSON(['status' => 'success', 'users' => $users]);
    }

    public function push()
    {
        $to = 'alahyane900@gmail.com';//Type here the mail address where you want to send
        $subject = 'Subject of Email';//Write here Subject of Email
        $message="Conngrats ! You did it.";//Write the message you want to send
        $email = \Config\Services::email();
        $email->setTo($to);
        $email->setFrom('alahyane900@gmail.com','Mail Testing');//set From
        $email->setSubject($subject);
        $email->setMessage($message);
        if($email->send())
        {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Email has been Sent.',
            ]);
        }
        else{
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Something went wrong !',
            ]);
        }
    }
    
    public function resetPassword($id)
    {
        $validation = \Config\Services::validation();

        // Define validation rules
        $validation->setRules([
            'currentPassword' => 'required',
            'newPassword' => 'required|min_length[8]',
        ]);

        // Validate input
        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validation->getErrors(),
            ]);
        }

        $currentPassword = $this->request->getVar('currentPassword');
        $newPassword = $this->request->getVar('newPassword');

        // Load the user model
        $userModel = new UserModel();
        $user = $userModel->find($id);

        // Check if the user exists
        if (!$user) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Verify the current password
        if (!password_verify($currentPassword, $user['password'])) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Current password is incorrect',
            ], 403);
        }

        // Check if the new password is the same as the current password
        if (password_verify($newPassword, $user['password'])) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'New password must be different from the current password',
            ], 400);
        }

        // Update the user's password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $userModel->update($id, ['password' => $hashedPassword]);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Password has been reset successfully',
        ]);
    }

}