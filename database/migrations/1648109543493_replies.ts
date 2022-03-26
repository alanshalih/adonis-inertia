import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Replies extends BaseSchema {
  protected tableName = 'replies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('comment_id')
      .unsigned()
      .references('comments.id')
      .onDelete('CASCADE')
      table.string("name")
      table.string("gravatar")
      table.text("content")
      
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
