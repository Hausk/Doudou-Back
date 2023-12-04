import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string([rules.trim()]),
    email: schema.string([
      rules.trim(),
      rules.lowercase(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    role: schema.enum(['admin', 'co-admin', 'moderateur']),
  })
  public messages: CustomMessages = {
    'username.required': 'Un nom est requis', 
    'email.required': 'Il faut spécifier un email',
    'email.unique': 'Un compte possède déjà cet email',
    'email.email': 'L\'email est invalide',
    'role.required': 'Séléctionnez un rôle',
  }
}
