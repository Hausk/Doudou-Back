import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from '../../database/factories'


test.group('Users | Register', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('ensure user creation is functionnal', async ({ client }) => {
    const response = await client.post('/dashboard/account/create').json({
      username: 'JBESSA',
      email: 'jonathan.bessa@example.com',
      role: 'admin',
    })
    response.assertStatus(201)
  })
  test('ensure cannot create user if email already exist', async ({ client }) => {
    await UserFactory.merge({ email: 'jonathan.bessa@example.com' }).create()
    const response = await client.post('/dashboard/account/create').json({
      username: 'Jonathan Bessa',
      email: 'jonathan.bessa@example.com',
      role: 'moderateur',
    })
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'unique',
          message: 'Un compte possède déjà cet email'
        },
      ],
    })
  })
})
