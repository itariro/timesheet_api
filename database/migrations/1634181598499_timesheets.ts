import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Timesheets extends BaseSchema {
  protected tableName = 'timesheets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('firebase_id')
      table.string('status')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
