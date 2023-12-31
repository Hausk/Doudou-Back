import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('username', 25).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('access_token').nullable()
      table.enu('role', ['admin', 'co-admin', 'moderateur'], {
        useNative: true,
        enumName: 'user_account_role',
        existingType: true,
      }).notNullable().defaultTo('moderateur')
      table.json('avatar').nullable()
      table.json('cover').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}