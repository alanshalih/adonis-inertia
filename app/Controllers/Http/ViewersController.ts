import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attendee from 'App/Models/Attendee';
import Event from 'App/Models/Event'
import Video from 'App/Models/Video';

const crypto = require('crypto')

export default class ViewersController {
  public async optin({inertia,params}: HttpContextContract) {
    
    const event = await Event.query().where("slug",params.id).first();

    if(event)
    return inertia.render("Optin",{event})
    else {
      return "Page Not Found";
    }
  } 

  public async validatePhone(phone) {

    let selected_dial_code = '+62';


    var number = phone.split('-').join(' ').split(' ').join('');
    if (number[0] == '0') {
      number = number.replace('0', '')
    }

    if (number.includes(selected_dial_code)) {
      number = number.replace(selected_dial_code, '')
    }

    if (number.substring(0, selected_dial_code.length - 1) == selected_dial_code.replace("+",
        '')) {
      number = number.replace(selected_dial_code.replace("+", ''), '')
    }

    number = selected_dial_code.replace("+", '') + number;


    return number;


  }

  public async registerViewer({params,request,response}: HttpContextContract) {
     
    // const identifier = request.input(request.input("identifier"));
    let identifier;

    const phone = request.input("phone") ? this.validatePhone(request.input("phone")) : ''

    if(request.input("identifier"))
    {
      if(request.input("identifier") == 'phone')
        identifier = phone;
        else identifier = request.input("email")
    }else{
      const event = await Event.find(params.event_id);

      if(event)
      {
        if(event.id_identifier == 'phone')
        identifier = phone;
        else identifier = request.input("email")
      }
    }

    const id = crypto.createHash('md5').update(identifier+params.event_id).digest('hex')

    let viewer = await Attendee.find(id);

    if(viewer)
    {
      
    }else{
      let gravatar;

      if(request.input("email"))
      { 
        gravatar = "https://www.gravatar.com/avatar/"+crypto.createHash('md5').update(request.input("email")).digest('hex');
      }else{
        gravatar = "https://ui-avatars.com/api/?background=random&name="+(request.input("name").split(" ").join("+"))
      }
      await Attendee.create({
        id,
        name : request.input("name"),
        email : request.input("email"),
        phone : phone.toString(),
        event_id : params.event_id,
        gravatar
      })
    }

    
    

    return response.redirect("/view/"+id)

    
  } 
  public async view({inertia,params}: HttpContextContract) {
    
    const viewer = await Attendee.query().where("id",params.id).first();

   

    if(viewer){ 
      const event = await Event.find(viewer.event_id);
      let videos;
      
      if(event)
      videos = await Video.query().where("event_id",event.id);

      if(!videos)
      {
        videos = [];
      }

      if(videos.length === 1)
      {
        videos = [];
      }

      return inertia.render("Viewer",{viewer,event,videos})
    } 
    else {
      return "Page Not Found";
    }
  } 
}
