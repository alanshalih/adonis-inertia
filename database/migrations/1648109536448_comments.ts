import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('event_id')
      .unsigned()
      .references('events.id')
      .onDelete('CASCADE')
      table.string("name")
      table.string("gravatar")
      table.text("content")
      table.integer("replies").defaultTo(0)
      table.integer("like").defaultTo(0)
      table.integer("score").defaultTo(0).index()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).index()
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
