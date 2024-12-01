<?php 

namespace App\Controllers;

use App\Models\ClubMembershipModel;

class ClubMembershipController extends BaseController {

    public function index() {
        $clubMembershipModel = new ClubMembershipModel();
        $data['all_Members'] = $clubMembershipModel->get_all_data();
        
        return $this->response->setJSON($data['all_Members']);

        
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
    }}