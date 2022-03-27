import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public logo: string

  @column()
  public description: string

  @column()
  public thumbnail: string

  @column()
  public social_share_title: string

  @column()
  public social_share_subtitle: string

  @column()
  public video_id: string

  @column()
  public id_identifier: string


  @column()
  public head_script: string


  @column()
  public body_script: string

  @column()
  public show_name: boolean

  @column()
  public show_phone: boolean

  @column()
  public show_email: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
