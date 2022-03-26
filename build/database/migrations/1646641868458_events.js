"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Events extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'events';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
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
            table
                .string('user_id')
                .unsigned()
                .references('users.id')
                .onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Events;
//# sourceMappingURL=1646641868458_events.js.map