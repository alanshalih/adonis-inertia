import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Attendees extends BaseSchema {
  protected tableName = 'attendees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("email")
      table.string("phone")
      table.string("name")
      table.string("province")
      table.string("city")
      table.string("subdistrict")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
