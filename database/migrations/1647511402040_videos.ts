import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Videos extends BaseSchema {
  protected tableName = 'videos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .string('event_id')
      .unsigned()
      .references('events.id')
      .onDelete('CASCADE')
      table.string("video_id");;
      table.string("title");
      table.string("thumbnail");
      table.bigInteger("viewer");
      table.bigInteger("peak_viewer");
      table.bigInteger("unique_viewer"); 
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
