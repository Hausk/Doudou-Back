import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import CreateUserValidator from '../../Validators/CreateUserValidator'

export default class UsersController {
    public async showAll({ response } : HttpContextContract) {
        const users = await User.all()
        return response.json({
            users
        })
    }
    public async show({ params, response } : HttpContextContract) {
        const user = await User.findBy('id', params.id)
        return response.json({
            user
        })
    }
    public async create({ auth, request, response }: HttpContextContract) {
        const payload = await request.validate(CreateUserValidator)

        const user = await User.create(payload)
        await auth.login(user)

        return response.created();
    }
    public async delete({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return response.json({
            status: 200,
            message: "Utilisateur supprimé"
        })
    }
}
