<?php

namespace App\Controllers;

use App\Models\ClubModel;
use App\Models\UserModel;
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
        $clubs = $clubModel->findAll();
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
        $club = $clubModel->where('slug', $slug)->first();

        if ($club) {
            $userModel = new UserModel();
            $user = $userModel->find($club['id_president']);

            $eventModel = new EventModel();
            $events = $eventModel->where('id_club', $club['id'])->findAll();

            if($user) {
                return $this->response->setJSON([
                    'status' => 'success',
                    'club'=> $club,
                    'president'=> $user,
                    'events' => $events
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
            // 'qr_code' => 'uploaded[qr_code]|max_size[qr_code,2042]|ext_in[qr_code,png,jpg,jpeg,webp]',
            // 'status' => 'required|string',
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
    
        // $qr_code = $this->request->getFile('qr_code');
        // if ($qr_code->isValid() && !$qr_code->hasMoved()) {
        //     $qr_code->move(FCPATH . 'uploads/clubs/');
        //     $qrCodePath = $qr_code->getName();
        // } else {
        //     log_message('error', 'Failed to upload QR code');
        //     return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload QR code']);
        // }
    
        $data = [
            'id_president' => $this->request->getVar('id_president'),
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'description' => $this->request->getVar('description'),
            'logo' => $logoPath,
            'background' => $backgroundPath,
            // 'qr_code' => $qrCodePath,
            'status' => "pending",
            'slug' => $this->request->getVar('slug'),
            'created_at' => date('Y-m-d H:i:s')
        ];
    
        if ($clubModel->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Club added successfully']);
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

        // Handle background upload if provided
        $background = $this->request->getFile('background');
        if ($background && $background->isValid() && !$background->hasMoved()) {
            $background->move(FCPATH . 'uploads/clubs/');
            $data['background'] = $background->getName();
        }

        // Update Club
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
}
