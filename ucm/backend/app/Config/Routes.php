<?php

use App\Controllers\ClubController;
use App\Controllers\RegisterController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

//user routes 
$routes->post('/register', 'UserController::register');
$routes->post('login', 'UserController::login');      
$routes->post('logout', 'UserController::logout');
$routes->get('/all-users','UserController::allusers');
$routes->get('user-number/(:num)','UserController::getuserByid/$1');



//admin routes
// $routes->post('/add-admin','AdminController::addadmin');
// $routes->post('/login-admin','AdminController::login_admin');
// $routes->post('/logout-admin','AdminController::logout_admin');
// $routes->get('/all-admins','AdminController::alladmins');
// $routes->post('/update-admin/(:num)','AdminController::update_admin/$1');
// $routes->get('/delet-admin/(:num)','AdminController::delete_admin/$1');


//club routes
$routes->get("/all-clubs","ClubController::allclubs");
$routes->get('/add-club-view','ClubController::addclubview');
$routes->post('/add-club','ClubController::addClub');
$routes->post('/update-club-number/(:num)','ClubController::updateClub/$1');
$routes->get('/delet-club-number/(:num)','ClubController::deleteClub/$1');


//event routes
$routes->post('/add-event','EventController::addevent'); 
$routes->post('/update-event-number/(:num)','EventController::updateevent/$1');
$routes->get('/delet-event-number/(:num)','EventController::deleteevent/$1');

//event request routes
$routes->post('/add-event-request','EventRequestController::addeventrequest');
$routes->post('/update-event-number-request/(:num)','EventRequestController::updateeventrequest/$1');
$routes->get('/delet-event-number-request/(:num)','EventRequestController::deleteeventrequest/$1');

//visitor routes
$routes->post('addevisitor','VisitorController::addevisitor');
$routes->post('/update-visitor/(:num)','VisitorController::updatevisitor/$1');
$routes->get('/delet-visitor/(:num)','VisitorController::deletevisitor/$1');


//club membership routes
$routes->get('club-mumbers','ClubMembershipController::index');

