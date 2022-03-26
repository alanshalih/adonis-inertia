import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async index({params,request}: HttpContextContract) {
    const page = request.input("page",1)

    if(request.input("sort_by") === "popularity")
    {
      return await Comment.query().where("event_id",params.event_id).orderBy("score","desc").paginate(page,10)
    }else{
      return await Comment.query().where("event_id",params.event_id).orderBy("created_at","desc").paginate(page,10)
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {

    const data = request.all()
    
    data.score = 0;
    data.like  = 0 ;
    data.replies = 0;

    const comment = await Comment.create(data)

    return comment;
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async like({params}: HttpContextContract) {

    const comment = await Comment.find(params.id)

    if(comment)
    {
      comment.like = comment.like+1;
      comment.score  = comment.score+1;
      comment.save();
    }

    return comment;
    
  }


  public async destroy({}: HttpContextContract) {}
}
