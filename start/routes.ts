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

 
Route.get('/register', async ({ inertia,auth,response }) => {


  await auth.use('web').check()
   
  // check login
  if(auth.use('web').isLoggedIn)
  {
    return response.redirect("/")
  }else{
    return inertia.render('Register')
  }

 
})

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
  Route.get('/', async ({ inertia }) => {
    return inertia.render('Test')
  }) 
}).middleware('auth')

Route.post('register','AuthController.register');
Route.post('login','AuthController.login');