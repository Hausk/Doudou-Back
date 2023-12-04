import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateWorkValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    title: schema.string([
      rules.trim(),
    ]),
    date: schema.string([rules.trim()]),
  })
  public messages: CustomMessages = {
    'title.required': 'Un titre est requis', 
    'date.required': 'Il faut donner une date',
  }
}
