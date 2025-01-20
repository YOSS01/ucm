<?php

namespace App\Controllers;

use App\Models\ClubModel;
use App\Models\UserModel;
use App\Models\ClubMembershipModel;
use App\Models\EventModel;
use CodeIgniter\HTTP\IncomingRequest;
class ClubController extends BaseController
{
    public function index()
    {
        // return view('club/index');
    }

    public function allclubs()
    {
        $clubModel = new ClubModel();
        $clubs = $clubModel
        ->select("
            clubs.*, 
            CONCAT(user.first_name, ' ', user.last_name) as president_name, 
            user.email as president_email, 
            COUNT(CASE WHEN clubMembership.status = 'approved' THEN 1 END) as members_count
        ")
        ->join('user', 'clubs.id_president = user.id', 'left') // Join with users table for president details
        ->join('clubmembership', 'clubs.id = clubmembership.id_club', 'left') // Join with clubMembership table
        ->groupBy('clubs.id') // Group by club ID for correct aggregation
        ->findAll();
        return $this->response->setJSON($clubs);
    }

    public function getClub($id){
        $clubModel = new ClubModel();
        $club = $clubModel->find($id);
        return $this->response->setJSON($club);
    }

    public function getClubBySlug($slug)
    {
        $clubModel = new ClubModel();
        $clubMembershipModel = new ClubMembershipModel();
        $club = $clubModel->where('slug', $slug)->first();

        if ($club) {
            $userModel = new UserModel();
            $user = $userModel->find($club['id_president']);

            $eventModel = new EventModel();
            $events = $eventModel->where('id_club', $club['id'])->findAll();

            // Count the approved members for the club
            $approvedMembersCount = $clubMembershipModel
                ->where('id_club', $club['id']) // Filter by club ID
                ->where('status', 'approved') // Only approved members
                ->countAllResults(); // Get the count of approved members

            // Add the count to the response
            if ($user) {
                return $this->response->setJSON([
                    'status' => 'success',
                    'club' => $club,
                    'president' => $user,
                    'events' => $events,
                    'members_count' => $approvedMembersCount // Add the count here
                ], 200);
            }

            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'President not found'
            ], 404);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Club not found'
            ], 404);
        }
    }


    public function addclubview()
    {

    }
    public function addClub() {
        $clubModel = new ClubModel();
    
        $validation = \Config\Services::validation();
    
        $validation->setRules([
            'id_president' => 'required|integer',
            'email' => 'required|string|max_length[255]',
            'name' => 'required|string|max_length[255]',
            'description' => 'required|string',
            'logo' => 'uploaded[logo]|max_size[logo,2042]|ext_in[logo,png,jpg,jpeg,webp,avif]',
            'background' => 'uploaded[background]|max_size[background,2042]|ext_in[background,png,jpg,jpeg,webp,avif]',
            'slug'=>'required|string|max_length[255]'
        ]);
    
        if (!$validation->withRequest($this->request)->run()) {
            log_message('error', 'Validation errors: ' . json_encode($validation->getErrors()));
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }
    
        $logo = $this->request->getFile('logo');
        if ($logo->isValid() && !$logo->hasMoved()) {
            $logo->move(FCPATH . 'uploads/clubs/');
            $logoPath = $logo->getName();
        } else {
            log_message('error', 'Failed to upload logo');
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload logo']);
        }
    
        $background = $this->request->getFile('background');
        if ($background->isValid() && !$background->hasMoved()) {
            $background->move(FCPATH . 'uploads/clubs/');
            $backgroundPath = $background->getName();
        } else {
            log_message('error', 'Failed to upload background');
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload background']);
        }
    
        $data = [
            'id_president' => $this->request->getVar('id_president'),
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'description' => $this->request->getVar('description'),
            'logo' => $logoPath,
            'background' => $backgroundPath,
            'status' => "pending",
            'slug' => $this->request->getVar('slug'),
            'created_at' => date('Y-m-d H:i:s')
        ];
    
        if ($clubModel->insert($data)) {
            $clubMembership = new ClubMembershipModel();
            $membershipData = [
                'id_club' => $clubModel->getInsertID(),
                'id_user' => $this->request->getVar('id_president'),
                'join_date' => date('Y-m-d H:i:s'),
                'role' => "president",
                'status' => "approved",
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            if($clubMembership->insert($membershipData)) {
                return $this->response->setJSON(['status' => 'success', 'message' => 'Club added successfully']);
            }
            return $this->response->setJSON(['status' => 'error', 'message' => 'Membership Failed']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to add club']);
        }
    }

 
    public function updateClub($id)
    {
        $validation = \Config\Services::validation();

        $validation->setRules([
            'id_president' => 'permit_empty|integer|max_length[255]',
            'email' => 'permit_empty|valid_email|max_length[255]',
            'name' => 'permit_empty|string|max_length[255]',
            'description' => 'permit_empty|string|max_length[255]',
            'logo' => 'permit_empty|uploaded[logo]|max_size[logo,1024]|ext_in[logo,png,jpg,jpeg,avif,webp]',
            'background' => 'permit_empty|uploaded[background]|max_size[background,1024]|ext_in[background,png,jpg,jpeg,avif,webp]',
            'status' => 'permit_empty|string|min_length[2]',
            'slug' => 'permit_empty|string|min_length[2]',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }

        $clubModel = new ClubModel();

        $club = $clubModel->find($id);
        if (!$club) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Club not found']);
        }

        $data = [];
        $fields = ['id_president', 'email', 'name', 'description', 'status', 'slug'];
        foreach ($fields as $field) {
            $value = $this->request->getVar($field);
            if (!is_null($value)) {
                $data[$field] = $value;
            }
        }

        $logo = $this->request->getFile('logo');
        if ($logo && $logo->isValid() && !$logo->hasMoved()) {
            $logo->move(FCPATH . 'uploads/clubs/');
            $data['logo'] = $logo->getName();
        }

        $background = $this->request->getFile('background');
        if ($background && $background->isValid() && !$background->hasMoved()) {
            $background->move(FCPATH . 'uploads/clubs/');
            $data['background'] = $background->getName();
        }

        if (!empty($data) && $clubModel->update($id, $data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Club updated successfully']);
        }

        return $this->response->setJSON(['status' => 'error', 'message' => 'No changes made or update failed']);
    }

    public function deleteClub($id)
    {
        $clubModel = new ClubModel();

        if ($clubModel->delete($id)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Club deleted successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to delete club']);
        }
    }


    
    public function clubstatistics($id)
    {
        $userModel = new UserModel();
        $eventModel = new EventModel();
        $clubMembershipModel = new ClubMembershipModel();
    
       
        $clubModel = new ClubModel();
        $club = $clubModel->find($id);
        if (!$club) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Club not found'], 404);
        }
    
  
        $totalUsers = $clubMembershipModel->where('id_club', $id)->countAllResults();
    
       
        $approvedUsers = $clubMembershipModel->where('id_club', $id)->where('status', 'approved')->countAllResults();
    
        
        $totalEvents = $eventModel->where('id_club', $id)->countAllResults();
    
    
        
        $statistics = [
            'total_requests' => $totalUsers,
            'total_members' => $approvedUsers,
            'total_events' => $totalEvents,
        ];
    
        return $this->response->setJSON(['status' => 'success', 'statistics' => $statistics]);
    }

    
}
