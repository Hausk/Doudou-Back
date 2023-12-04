import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../Models/User'
import SocialToken from '../Models/SocialToken'
import { EnumType, schema } from '@ioc:Adonis/Core/Validator'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const userId = auth.use('api').user.id
    const user = await User.findByOrFail('id', userId)
    if (user.role !== 'admin' as unknown) {
      return response.status(404)
    }
    await next()
  }
}
