import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddHeadscriptToEvents extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => { 
      table.text("head_script")
      table.text("body_script")
    })
  }

  public async down () { 
    
  }
}
