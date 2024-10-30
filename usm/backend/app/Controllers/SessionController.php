<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class SessionController extends Controller
{
    public function logout()
    {
        $session = session();
        $session->destroy();
        return $this->response->setJSON(['status' => 'success', 'message' => 'Logout successful']);
    }
}
