<?php 

namespace App\Controllers;

use App\Models\ClubMembershipModel;

class ClubMembershipController extends BaseController {

    public function index() {
        $clubMembershipModel = new ClubMembershipModel();
        $data['all_Members'] = $clubMembershipModel->get_all_data();
        
        return $this->response->setJSON($data['all_Members']);

        //    return view('', $data);
    }
    public function getclubmembers() {

       
    
    }

}