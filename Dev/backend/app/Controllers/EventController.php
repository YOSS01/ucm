<?php 

namespace App\Controllers;

use App\Models\ClubModel;
use CodeIgniter\HTTP\IncomingRequest;
use App\Models\EventModel;
use App\Models\EventRequestModel;

use App\Models\UserModel;
use App\Models\ClubMembershipModel;

class EventController extends BaseController
{
    public function index()
    {
        // return view();
    }

    public function allEvents()
    {
        $eventModel = new EventModel();
        $events = $eventModel
        ->select("
            event.*, 
            clubs.name as club_name, 
            clubs.slug as club_slug, 
            COUNT(CASE WHEN eventRequest.status = 'approved' THEN 1 END) as participant_count
        ")
        ->join('clubs', 'event.id_club = clubs.id') // Join with clubs table
        ->join('eventRequest', 'event.id = eventRequest.id_event', 'left') // Join with eventRequest table
        ->groupBy('event.id') // Group by event ID to ensure correct counts
        ->findAll();
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
            'picture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg,avif,webp]',
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

    public function updateEvent($id)
    {
        $validation = \Config\Services::validation();

        $validation->setRules([
            'id_club' => 'permit_empty|integer|max_length[255]',
            'name' => 'permit_empty|string|max_length[255]',
            'description' => 'permit_empty|string|max_length[255]',
            'picture' => 'permit_empty|uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg,avif,webp]',
            'location' => 'permit_empty|string|min_length[2]',
            'date' => 'permit_empty|valid_date',
        ]);

        if (!$validation->withRequest($this->request)->run()) {
            return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
        }

        $eventModel = new EventModel();

        $event = $eventModel->find($id);
        if (!$event) {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Event not found']);
        }

        $data = [];
        $fields = ['id_club', 'name', 'description', 'location', 'date'];
        foreach ($fields as $field) {
            $value = $this->request->getVar($field);
            if (!is_null($value)) {
                $data[$field] = $value;
            }
        }

        $picture = $this->request->getFile('picture');
        if ($picture && $picture->isValid() && !$picture->hasMoved()) {
            $picture->move(FCPATH . 'uploads/events/');
            $data['picture'] = $picture->getName();
        }

       
        if (!empty($data) && $eventModel->update($id, $data)) {
            return $this->response->setJSON(['status' => 'success', 'message' => 'Event updated successfully']);
        }

        return $this->response->setJSON(['status' => 'error', 'message' => 'No changes made or update failed']);
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


    public function getClubEvents($id)
    {
        $clubModel = new ClubModel();
        $eventModel = new EventModel();
    
      
        $club = $clubModel->find($id);
        if (!$club) {
            log_message('error', 'Club not found: ' . $id);
            return $this->response->setJSON(['status' => 'error', 'message' => 'Club not found'], 404);
        }
    
      
        $events = $eventModel->where('id_club', $id)->findAll();
    
        $eventDetails = [];
        foreach ($events as $event) {
            $eventDetails[] = [
                'id' => $event['id'],
                'name' => $event['name'],
                'description' => $event['description'],
                'location' => $event['location'],
                'date' => $event['date'],
                'picture' => $event['picture'],
                'created_at' => $event['created_at'],
                'club_name' => $club['name'],
                'club_slug' => $club['slug']
            ];
        }
    
        return $this->response->setJSON(['status' => 'success', 'events' => $eventDetails]);
    }

    public function getEventParticipants($id)
    {
        $eventModel = new EventModel();
        $eventRequestModel = new EventRequestModel();

        // Check if the event exists
        $event = $eventModel->find($id);

        if (!$event) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }

        // Get participants with 'approved' status
        $participants = $eventRequestModel
            ->select("
                eventrequest.id as requestId,
                eventrequest.type,
                eventrequest.status,
                eventrequest.request_date,
                CASE
                    WHEN eventrequest.type = 'user' THEN CONCAT(user.first_name, ' ', user.last_name)
                    ELSE visitors.name
                END AS name,
                CASE
                    WHEN eventrequest.type = 'user' THEN user.email
                    ELSE visitors.email
                END AS email
            ")
            ->join('user', 'eventrequest.id_visitor = user.id AND eventrequest.type = "user"', 'left')
            ->join('visitors', 'eventrequest.id_visitor = visitors.id AND eventrequest.type = "visitor"', 'left')
            ->where('eventrequest.id_event', $id)
            ->findAll();

        return $this->response->setJSON([
            'status' => 'success',
            'participants' => $participants
        ], 200);
    }

    public function updateParticipantStatus($id)
    {
        $eventRequestModel = new EventRequestModel();

        // Get the new status from the request payload
        $newStatus = $this->request->getVar('status');

        // Validate the input
        if (!$newStatus || !in_array($newStatus, ['approved', 'pending', 'rejected'])) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Invalid or missing status value.'
            ], 400);
        }

        // Find the event request by ID
        $eventRequest = $eventRequestModel->find($id);

        if (!$eventRequest) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Event request not found.'
            ], 404);
        }

        // Update the status
        $eventRequest['status'] = $newStatus;
        $eventRequestModel->update($id, $eventRequest);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Participant status updated successfully.',
        ], 200);
    }
}