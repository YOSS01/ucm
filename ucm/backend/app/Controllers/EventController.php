<?php 

namespace App\Controllers;

use App\Models\ClubModel;
use CodeIgniter\HTTP\IncomingRequest;
use App\Models\EventModel;

class EventController extends BaseController
{
    public function index()
    {
        // return view();
    }

    public function allEvents()
    {
        $eventModel = new EventModel();
        $events = $eventModel->findAll();
        return $this->response->setJSON($events);
    }

    public function getEvent($id){
        $eventModel = new EventModel();
        $event = $eventModel->find($id);
        return $this->response->setJSON($event);
    }

    public function addevent()
    {
        $event = new EventModel();
        $validation = \Config\Services::validation();

        $validation->setRules([
            'id_club' => 'required|integer',
            'name' => 'required|string|max_length[255]',
            'description' => 'required|string',
            'location' => 'required|string|max_length[255]',
            'picture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]',
            'date' => 'required|valid_date'
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }

        $picture = $this->request->getFile('picture');
        if ($picture->isValid() && !$picture->hasMoved()) {
            $picture->move(FCPATH . 'uploads/events/');
            $picturePath = $picture->getName();
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload picture']);
        }

        $data = [
            'id_club' => $this->request->getVar('id_club'),
            'name' => $this->request->getVar('name'),
            'description' => $this->request->getVar('description'),
            'location' => $this->request->getVar('location'),
            'picture' => $picturePath,
            'date' => $this->request->getVar('date'),
            'created_at' => date('Y-m-d H:i:s')
        ];

        if ($event->insert($data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Event added successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to add event']);
        }
    }

    public function updateevent($id)
    {
        $event = new EventModel();
        $data = [];
    
   
        $picture = $this->request->getFile('picture');
        if ($picture && $picture->isValid() && !$picture->hasMoved()) {
            $picture->move(FCPATH . 'uploads/');
            $data['picture'] = $picture->getName();
        } elseif ($picture && !$picture->isValid()) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to upload picture']);
        }
    
      
        $data['id_club'] = $this->request->getVar('id_club');
        $data['name'] = $this->request->getVar('name');
        $data['description'] = $this->request->getVar('description');
        $data['location'] = $this->request->getVar('location');
        $data['date'] = $this->request->getVar('date');
    
       
        if ($event->update($id, $data)) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Event updated successfully'
            ]);
        } else {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Failed to update event'
            ]);
        }
    }

    public function deleteEvent($id)
    {
        $event = new EventModel();
        if ($event->delete($id)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Event deleted successfully']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to delete event']);
        }
    }
}