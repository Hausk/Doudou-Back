import { DateTime } from 'luxon'
import { column, BaseModel, HasOne, hasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Image from './Image'
import User from './User'

export default class Work extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string

  @column()
  public date: string

  @column()
  public access_token: string

  @hasOne(() => Image)
  public PinnedImage: HasOne<typeof Image>

  @hasOne(() => User)
  public User: HasOne<typeof User>

  @hasMany(() => Image)
  public Images: HasMany<typeof Image>
}
