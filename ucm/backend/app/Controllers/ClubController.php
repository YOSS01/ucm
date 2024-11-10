<?php

namespace App\Controllers;

use App\Models\ClubModel;
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
    public function addclubview()
    {

    }
    public function addClub() {
        $clubModel = new ClubModel();

        $validation = \Config\Services::validation();

        $validation->setRules([
            'id_president' => 'required|integer',
            'name' => 'required|string|max_length[255]',
            'description' => 'required|string',
            'logo' => 'uploaded[logo]|max_size[logo,1024]|ext_in[logo,png,jpg,jpeg]',
            'background' => 'uploaded[background]|max_size[background,1024]|ext_in[background,png,jpg,jpeg]',
            'qr_code' => 'uploaded[qr_code]|max_size[qr_code,1024]|ext_in[qr_code,png,jpg,jpeg]',
            'status' => 'required|string',
            'slug'=>'required|String|max_length[255]'
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }
    $logo = $this->request->getFile('logo');
    if ($logo->isValid() && !$logo->hasMoved()) {
        $logo->move(WRITEPATH . 'uploads/');
        $logoPath = $logo->getName();
    } else {
        return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload logo']);
    }

    $background = $this->request->getFile('background');
    if ($background->isValid() && !$background->hasMoved()) {
        $background->move(WRITEPATH . 'uploads/');
        $backgroundPath = $background->getName();
    } else {
        return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload background']);
    }

    $qr_code = $this->request->getFile('qr_code');
    if ($qr_code->isValid() && !$qr_code->hasMoved()) {
        $qr_code->move(WRITEPATH . 'uploads/');
        $qrCodePath = $qr_code->getName();
    } else {
        return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload QR code']);
    }
     
        $data = [
            'id_president'=>$this->request->getVar('id_president'),
            'name' => $this->request->getVar('name'),
            'description' => $this->request->getVar('description'),
            'logo' => $logoPath,
            'background' =>$backgroundPath,
            'qr_code' =>  $qrCodePath,
            'status' => $this->request->getVar('status'),
            'slug'=>$this->request->getVar('slug')
 
        ];
       

        if ($clubModel->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Club added successfully']);
        } else {
    
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to add club']);
        }
    }

 
    public function updateClub($id)
    {
        $clubModel = new ClubModel();
        $validation = \Config\Services::validation();

        $validation->setRules([
            'id_president' => 'required|integer',
            'name' => 'required|string|max_length[255]',
            'description' => 'required|string',
            'logo' => 'uploaded[logo]|max_size[logo,1024]|ext_in[logo,png,jpg,jpeg]',
            'background' => 'uploaded[background]|max_size[background,1024]|ext_in[background,png,jpg,jpeg]',
            'qr_code' => 'uploaded[qr_code]|max_size[qr_code,1024]|ext_in[qr_code,png,jpg,jpeg]',
            'status' => 'required|string',
            'slug'=>'required|String|max_length[255]'
        ]);

        $logo = $this->request->getFile('logo');
        if ($logo->isValid() && !$logo->hasMoved()) {
            $logo->move(WRITEPATH . 'upload/');
            $logoPath = $logo->getName();
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload logo']);
        }
    
        $background = $this->request->getFile('background');
        if ($background->isValid() && !$background->hasMoved()) {
            $background->move(WRITEPATH . 'upload/');
            $backgroundPath = $background->getName();
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload background']);
        }
    
        $qr_code = $this->request->getFile('qr_code');
        if ($qr_code->isValid() && !$qr_code->hasMoved()) {
            $qr_code->move(WRITEPATH . 'upload/');
            $qrCodePath = $qr_code->getName();
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload QR code']);
        }
         
            $data = [
                'id_president'=>$this->request->getVar('id_president'),
                'name' => $this->request->getVar('name'),
                'description' => $this->request->getVar('description'),
                'logo' => $logoPath,
                'background' =>$backgroundPath,
                'qr_code' =>  $qrCodePath,
                'status' => $this->request->getVar('status'),
                'slug'=>$this->request->getVar('slug')
            ];

       
        if ($clubModel->update($id, $data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Club updated successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to update club']);
        }
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
