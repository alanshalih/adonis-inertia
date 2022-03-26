"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Attendees extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'attendees';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').unique();
            table.string("email");
            table.string("phone");
            table.string("name");
            table.string("gravatar");
            table
                .string('event_id')
                .unsigned()
                .references('events.id')
                .onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Attendees;
//# sourceMappingURL=1647511433787_attendees.js.map