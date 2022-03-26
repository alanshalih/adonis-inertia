"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Comment"));
class CommentsController {
    async index({ params, request }) {
        const page = request.input("page", 1);
        if (request.input("sort_by") === "popularity") {
            return await Comment_1.default.query().where("event_id", params.event_id).orderBy("score", "desc").paginate(page, 10);
        }
        else {
            return await Comment_1.default.query().where("event_id", params.event_id).orderBy("created_at", "desc").paginate(page, 10);
        }
    }
    async create({}) { }
    async store({ request }) {
        const data = request.all();
        data.score = 0;
        data.like = 0;
        data.replies = 0;
        const comment = await Comment_1.default.create(data);
        return comment;
    }
    async show({}) { }
    async edit({}) { }
    async update({}) { }
    async like({ params }) {
        const comment = await Comment_1.default.find(params.id);
        if (comment) {
            comment.like = comment.like + 1;
            comment.score = comment.score + 1;
            comment.save();
        }
        return comment;
    }
    async destroy({}) { }
}
exports.default = CommentsController;
//# sourceMappingURL=CommentsController.js.map