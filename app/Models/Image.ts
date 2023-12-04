import { DateTime } from 'luxon'
import { column, BaseModel, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Work from './Work'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public title: string

  @column()
  public path: string

  @hasOne(() => User)
  public User: HasOne<typeof User>

  @hasOne(() => Work)
  public Works: HasOne<typeof Work>
}
