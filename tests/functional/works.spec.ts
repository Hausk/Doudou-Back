import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Works', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('ensure work creation is functionnal', async ({ client }) => {
    const response = await client.post('/dashboard/works/create').json({
      title: 'Work Test',
      date: 'Janvier 2024',
    })
    console.log(response.error)
    response.assertStatus(201)
  })
})
