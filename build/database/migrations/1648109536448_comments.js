"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Comments extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'comments';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('event_id')
                .unsigned()
                .references('events.id')
                .onDelete('CASCADE');
            table.string("name");
            table.string("gravatar");
            table.text("content");
            table.integer("replies").defaultTo(0);
            table.integer("like").defaultTo(0);
            table.integer("score").defaultTo(0).index();
            table.timestamp('created_at', { useTz: true }).index();
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Comments;
//# sourceMappingURL=1648109536448_comments.js.map