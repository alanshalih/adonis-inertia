import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Attendee extends BaseModel {
  @column()
  public id: string

  @column()
  public name: string
  
  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public gravatar: string

  @column()
  public event_id: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
