<?php 

namespace App\Controllers;

use App\Models\ClubMembershipModel;

class ClubMembershipController extends BaseController {

    public function index() {
        $clubMembershipModel = new ClubMembershipModel();
        $data['all_Members'] = $clubMembershipModel->get_all_data();
        
        return $this->response->setJSON($data['all_Members']);

        
    }

    // Add Club Membership
    public function addClubMembership() {

        $validation = \Config\Services::validation();
        $validation->setRules([
            'id_user' => 'required|integer',
            'id_club' => 'required|integer',
        ]);
        if (!$validation->withRequest($this->request)->run()) {
            log_message('error', 'Validation errors: ' . json_encode($validation->getErrors()));
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }

        $clubMembershipModel = new ClubMembershipModel();

        // Check if the request is already exists
        $existingMembership = $clubMembershipModel->where('id_user', $this->request->getVar('id_user'))
            ->where('id_club', $this->request->getVar('id_club'))
            ->first();

        if ($existingMembership) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Membership request for this club has already been submitted.',
            ]);
        }

        // Create new membership
        $newMembershipData = [
            'id_user' => $this->request->getVar('id_user'),
            'id_club' => $this->request->getVar('id_club'),
            'role' => 'member',
            'status' => 'pending',
            'join_date' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ];

        if ($clubMembershipModel->insert($newMembershipData)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Membership Request sent successfully',
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to request the membership. Please try again.',
            ]);
        }
    }

    public function updateClubMembershipStatus($id){
        $clubMembershipModel = new ClubMembershipModel();
        
        $status = $this->request->getVar('status');

        $data = [
            'status' => $status,
        ];

       if(!$clubMembershipModel->update($id, $data)){
        return $this->response->setJson([
            'status' => 'error',
            'message' => 'Club Membership not found'
        ], 404);
       } 
       else {
        return $this->response->setJson([
            'status' => 'success',
            'message' => 'Club Membership updated successfully'
        ], 200);
       }
    }
}