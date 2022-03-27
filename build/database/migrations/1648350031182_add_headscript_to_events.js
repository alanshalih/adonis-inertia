"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddHeadscriptToEvents extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'events';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.text("head_script");
            table.text("body_script");
        });
    }
    async down() {
    }
}
exports.default = AddHeadscriptToEvents;
//# sourceMappingURL=1648350031182_add_headscript_to_events.js.map