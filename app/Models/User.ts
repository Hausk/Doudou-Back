import { DateTime } from 'luxon'
import { column,BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { EnumType } from '@ioc:Adonis/Core/Validator'
import Image from './Image'
import Work from './Work'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public role: EnumType

  @column()
  public access_token: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @column()
  public avatar: string

  @column()
  public cover: string

  @hasMany(() => Image)
  public Images: HasMany<typeof Image>

  @hasMany(() => Work)
  public Works: HasMany<typeof Work>
}
