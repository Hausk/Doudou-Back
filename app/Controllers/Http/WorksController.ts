// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WorksController {
    public async showAll() {
        return 'showAll'
    }
    public async show(id) {
        return id
    }
}
