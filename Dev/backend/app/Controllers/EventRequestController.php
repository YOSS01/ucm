<?php 



namespace App\Controllers;


use App\Models\EventRequestModel;
class EventRequestController extends BaseController
{

 public function index(){

    // return view();


 }
 public function addeventrequest(){
    
    $eventRequest = new EventRequestModel();

    $validation = \Config\Services::validation();
    $validation->setRules(([
    'id_visitor' => 'required|integer',
    'id_event' => 'required|integer',
    'type' => 'required|string'
    ]));

    if($validation->withRequest($this->request)->run() == false){
    return $this->response->setJSON(['status'=>'error','message'=>$validation->getErrors()]);
    }

   if($this->request->getVar('type') == "user") {
        $existingEventRequest = $eventRequest->where('id_visitor', $this->request->getVar('id_visitor'))
        ->where('id_event', $this->request->getVar('id_event'))
        ->first();

        if ($existingEventRequest) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Request for this event has already been submitted.',
            ]);
        }
   }
    

    $data = [
        'id_visitor'   => $this->request->getVar('id_visitor'),
        'id_event'     => $this->request->getVar('id_event'),
        'status'       => "pending",
        'type'         => $this->request->getVar('type'),
        'request_date' => date('Y-m-d H:i:s'),
        'created_at' => date('Y-m-d H:i:s')
    ];

    if($eventRequest->insert($data)){
        return $this->response->setJSON(['status'=>'success','message'=>'Event request added successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to add event request ']);
    }

 }
 public function updateeventrequest($id){

    $eventreq = new EventRequestModel();

    $data =[
        'id_club'      => $this->request->getVar('id_club'),
        'id_visitor'   => $this->request->getVar('id_visitor'),
        'id_event'     => $this->request->getVar('id_event'),
        'status'       => $this->request->getVar('status'),
        'request_date' => date('Y-m-d H:i:s') 
    
        ];
    if($eventreq->update($id,$data)){
        return $this->response->setJSON(['status'=>'success','message'=>'Eventreq updated successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to update eventreq']);
    }
 }

 public function deleteeventrequest($id){
  $eventreq = new EventRequestModel();
  if($eventreq->delete($id)){
      return $this->response->setJSON(['status'=>'success','message'=>'Eventreq deleted successfully']);
  }else{
      return $this->response->setJSON(['status'=>'error','message'=>'Failed to delete evenreqt']);
  }
 }


 public function eventVisitors($id){

    $event = new EventRequestModel();
    $eventVisitors = $event->where('id_event', $id)->countAllResults();
    
  

    return $this->response->setJSON([$eventVisitors]);
    
 }

}