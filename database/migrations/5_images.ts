import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.string('path', 50).notNullable().unique()
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
      table.uuid('work_id').references('works.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
