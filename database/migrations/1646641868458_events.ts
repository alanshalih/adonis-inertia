import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("title");
      table.string("slug").index();
      table.string("logo");
      table.text("description");
      table.string("thumbnail");
      table.string("social_share_title");
      table.string("social_share_subtitle");
      table.string("video_id"); 
      table.string("id_identifier"); 
      table.boolean("show_name"); 
      table.boolean("show_phone"); 
      table.boolean("show_email");  
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
