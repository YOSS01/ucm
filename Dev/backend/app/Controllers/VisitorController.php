<?php 



namespace App\Controllers;


use App\Models\VisitorModel;
class VisitorController extends BaseController
{

 public function index(){

    // return view();


 }
 public function addVisitor(){
    
    $visitor = new VisitorModel();
        $validation = \Config\Services::validation();
        $validation->setRules(([
            'name' => 'required|string|max_length[255]',
            'email' => 'required|valid_email'
        ]));
        if($validation->withRequest($this->request)->run() == false){
            return $this->response->setJSON(['status'=>'error','message'=>$validation->getErrors()]);
    
        }
    $data = [
        'name'=> $this->request->getVar('name'),
        'email'   => $this->request->getVar('email')
    ];
  
    if($visitor->insert($data)){
        return $this->response->setJSON(['status'=>'success','message'=>'visitor added successfully', 'visitor_id' => $visitor->getInsertID()]);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to add visitor ']);
    }

 }
 public function updatevisitor($id){

    $visitor = new VisitorModel();

    $data =[
        'name'      => $this->request->getVar('name'),
        'email'   => $this->request->getVar('email')
    
        ];
    if($visitor->update($id,$data)){
        return $this->response->setJSON(['status'=>'success','message'=>'visitor updated successfully']);
    }else{
        return $this->response->setJSON(['status'=>'error','message'=>'Failed to update visitor']);
    }
 }

 public function deletevisitor($id){
  $visitor = new VisitorModel();
  if($visitor->delete($id)){
      return $this->response->setJSON(['status'=>'success','message'=>'visitor deleted successfully']);
  }else{
      return $this->response->setJSON(['status'=>'error','message'=>'Failed to delete visitor']);
  }
 }

}