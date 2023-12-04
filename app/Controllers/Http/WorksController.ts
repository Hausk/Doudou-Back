import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Work from "../../Models/Work"
import CreateWorkValidator from '../../Validators/CreateWorkValidator'

export default class WorksController {
    public async showAll({ response } : HttpContextContract) {
        const works = await Work.all()
        return response.json({
            works
        })
    }
    public async show({ params, response } : HttpContextContract) {
        const work = await Work.findBy('id', params.id)
        return response.json({
            work
        })
    }
    public async create({ request, response }: HttpContextContract) {
        const payload = await request.validate(CreateWorkValidator)
        await Work.create(payload)
        return response.created();
    }
    public async delete({ params, response }: HttpContextContract) {
        const work = await Work.findOrFail(params.id)
        await work.delete()
        return response.json({
            status: 200,
            message: "Catégorie supprimé"
        })
    }
}
