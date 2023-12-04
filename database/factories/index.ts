import Factory from '@ioc:Adonis/Lucid/Factory'
import User from '../../app/Models/User'
import Image from '../../app/Models/Image'
import Work from '../../app/Models/Work'

export const UserFactory = Factory.define(User, ({ faker }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['admin', 'co-admin', 'moderateur'])
    }
}).build()

export const WorkFactory = Factory.define(Work, ({ faker }) => {
    return {
        title: faker.internet.userName(),
        Date: faker.date.weekday()
    }
}).build()