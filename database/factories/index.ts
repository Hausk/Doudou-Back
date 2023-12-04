import Factory from '@ioc:Adonis/Lucid/Factory'
import User from '../../app/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['admin', 'co-admin', 'moderateur'])
    }
}).build()