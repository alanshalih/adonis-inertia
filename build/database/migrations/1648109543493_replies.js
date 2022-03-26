"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Replies extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'replies';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .string('comment_id')
                .unsigned()
                .references('comments.id')
                .onDelete('CASCADE');
            table.string("name");
            table.string("gravatar");
            table.text("content");
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Replies;
//# sourceMappingURL=1648109543493_replies.js.map