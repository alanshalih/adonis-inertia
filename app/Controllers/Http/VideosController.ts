import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event';
import Video from 'App/Models/Video'

export default class VideosController {
  public async index({}: HttpContextContract) {}

  public async create({inertia,params}: HttpContextContract) {
    return inertia.render("CreateVideo",{event_id : params.event_id})
  }

  public async store({request,params,response}: HttpContextContract) {
    let data = request.all();
    data.event_id = parseInt(params.event_id);
    await Video.create(data)
    return response.redirect("/event/"+params.event_id+"/edit")
  }

  public async show({}: HttpContextContract) {}

  public async edit({inertia,params}: HttpContextContract) {
    const form = await Video.find(params.id)
    const event = await Event.find(params.event_id);
    let main_video = false;
    if(event && form)
    if(event.video_id == form.video_id)
    {
      main_video  = true;
    } 
    return inertia.render("EditVideo",{event_id : params.event_id,form,main_video})
  }

  public async update({params,request,response}: HttpContextContract) {
    let data = request.except(['id','main_video']);
     await Video.query().where('id',params.id).update(data)
     if(request.input("main_video"))
     {
       await Event.query().where("id",params.event_id).update({video_id : request.input("video_id")})
     }
     return response.redirect("/event/"+params.event_id+"/edit")

  }

  public async destroy({}: HttpContextContract) {}
}
