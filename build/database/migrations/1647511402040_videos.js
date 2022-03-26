"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Videos extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'videos';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('event_id')
                .unsigned().index();
            table.string("video_id");
            ;
            table.string("title");
            table.string("thumbnail");
            table.bigInteger("viewer");
            table.bigInteger("peak_viewer");
            table.bigInteger("unique_viewer");
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Videos;
//# sourceMappingURL=1647511402040_videos.js.map