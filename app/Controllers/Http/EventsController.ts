import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import Video from 'App/Models/Video';

export default class EventsController {
  public async index({inertia}: HttpContextContract) {
      const events = await Event.all();
 
      return inertia.render('Home',{events})
     
  }

  public async create({inertia}: HttpContextContract) {
 
      return inertia.render("CreateEvent");
  }

  public async store({request,response}: HttpContextContract) {

    let data = request.all();
    
    const result = await Event.create(data)

    return response.redirect("/event/"+result.id+'/edit');
  }

  public async show({inertia}: HttpContextContract) {
    return inertia.render("ShowEvent");
  }

  public async edit({inertia,params}: HttpContextContract) {
    
    const form = await Event.find(params.id)

    if(form)
    {
      const videos = await Video.query().where("event_id",form.id);


      return inertia.render("EditEvent",{form,videos});
    
    }
   
  }

  public async update({params,request}: HttpContextContract) {
    await Event.query().where('id',params.id).update(request.except(['id']));
    


  }

  public async destroy({}: HttpContextContract) {}
}
