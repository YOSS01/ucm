<?php 



namespace App\Controllers;

use App\Models\ClubModel;
use CodeIgniter\HTTP\IncomingRequest;
use App\Models\EventModel;
class EventController extends BaseController
{

 public function index(){

    // return view();


 }
 public function addevent(){
    
    $event = new EventModel();
    $validation = \Config\Services::validation();

    $validation->setRules([
        'id_club' => 'required|integer',
        'name' => 'required|string|max_length[255]',
        'description' => 'required|string',
        'location' => 'required|string|max_length[255]',
        'picture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]',
        'background' => 'uploaded[background]|max_size[background,1024]|ext_in[background,png,jpg,jpeg]'
    ]);

    if (!$validation->withRequest($this->request)->run()) {
        return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
    }


    $backround = $this->request->getFile('background');
    if($backround->isValid() && !$backround->hasMoved()){
        $backround->move(WRITEPATH , 'uploads/');
        $backroundPath = $backround->getName();
    } else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to upload background']);
    }
    $picture = $this->request->getFile('picture');
    if($picture->isValid() && !$picture->hasMoved()){
        $picture->move(WRITEPATH , 'uploads/');
        $picturePath = $picture->getName();
    } else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to upload picture']);
    }
    $data =[
    'id_club' => $this->request->getVar('id_club'),
    'name'=>$this->request->getVar('name'),
    'description'=>$this->request->getVar('description'),
    'location'=>$this->request->getVar('location'),
    'picture'=>$picturePath,
    'background'=> $backroundPath

    ];
    if($event->insert($data)){
        return $this->response->setJSON(['status'=>'success','message'=>'Event added successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to add event']);
    }

 }
 public function updateevent($id){

    $event = new EventModel();
    $validation = \Config\Services::validation();

    $validation->setRules([
        'id_club' => 'required|integer',
        'name' => 'required|string|max_length[255]',
        'description' => 'required|string',
        'location' => 'required|string|max_length[255]',
        'picture' => 'uploaded[picture]|max_size[picture,1024]|ext_in[picture,png,jpg,jpeg]',
        'background' => 'uploaded[background]|max_size[background,1024]|ext_in[background,png,jpg,jpeg]'
    ]);

    if (!$validation->withRequest($this->request)->run()) {
        return $this->response->setJSON(['status' => 'error', 'message' => $validation->getErrors()]);
    }


    $backround = $this->request->getFile('background');
    if($backround->isValid() && !$backround->hasMoved()){
        $backround->move(WRITEPATH , 'uploads/');
        $backroundPath = $backround->getName();
    } else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to upload background']);
    }
    $picture = $this->request->getFile('picture');
    if($picture->isValid() && !$picture->hasMoved()){
        $picture->move(WRITEPATH , 'uploads/');
        $picturePath = $picture->getName();
    } else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to upload picture']);
    } 

    $data =[
    'id_club' => $this->request->getVar('id_club'),
    'name'=>$this->request->getVar('name'),
    'description'=>$this->request->getVar('description'),
    'location'=>$this->request->getVar('location'),
    'picture'=>$picturePath,
    'background'=> $backroundPath

    ];
    if($event->update($id,$data)){
        return $this->response->setJSON(['status'=>'success','message'=>'Event updated successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to update event']);
    }
 }
 public function deleteevent($id){
    $event = new EventModel();
    if($event->delete($id)){
        return $this->response->setJSON(['status'=>'success','message'=>'Event deleted successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to delete event']);
    }
 }
 

}