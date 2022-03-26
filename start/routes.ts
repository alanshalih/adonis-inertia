/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route' 

 


Route.get('/login', async ({ inertia,auth,response }) => {
   
  // await auth.use('web').authenticate() 

  await auth.use('web').check()
  // check login
  if(auth.use('web').isLoggedIn)
  {
    return response.redirect("/")
  }else{
    return inertia.render('Login')
  }

})

Route.group(()=>{
  Route.get('/', 'EventsController.index')  
  Route.resource('/event','EventsController')
  Route.resource('/event/:event_id/video','VideosController')
  Route.post('/upload','UploadFilesController.upload')
  Route.post('/logout','AuthController.logout')
  Route.get('/register', async ({ inertia }) => {
 
   
    // check login
    return inertia.render('Register')
  
   
  })

Route.post('register','AuthController.register');

}).middleware('auth')

Route.post('login','AuthController.login');
Route.get("/:id","ViewersController.optin");
Route.get("/view/:id","ViewersController.view");
Route.post("/view/:event_id","ViewersController.registerViewer");
Route.get("/api/register/:event_id","ViewersController.registerViewer");
Route.get("/comment/:event_id","CommentsController.index");
Route.post("/comment","CommentsController.store");
Route.post("/like/:id","CommentsController.like");