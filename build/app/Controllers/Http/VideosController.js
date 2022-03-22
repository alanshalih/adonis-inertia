"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Event"));
const Video_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Video"));
class VideosController {
    async index({}) { }
    async create({ inertia, params }) {
        return inertia.render("CreateVideo", { event_id: params.event_id });
    }
    async store({ request, params, response }) {
        let data = request.all();
        data.event_id = parseInt(params.event_id);
        await Video_1.default.create(data);
        return response.redirect("/event/" + params.event_id + "/edit");
    }
    async show({}) { }
    async edit({ inertia, params }) {
        const form = await Video_1.default.find(params.id);
        const event = await Event_1.default.find(params.event_id);
        let main_video = false;
        if (event && form)
            if (event.video_id == form.video_id) {
                main_video = true;
            }
        return inertia.render("EditVideo", { event_id: params.event_id, form, main_video });
    }
    async update({ params, request, response }) {
        let data = request.except(['id', 'main_video']);
        await Video_1.default.query().where('id', params.id).update(data);
        if (request.input("main_video")) {
            await Event_1.default.query().where("id", params.event_id).update({ video_id: request.input("video_id") });
        }
        return response.redirect("/event/" + params.event_id + "/edit");
    }
    async destroy({}) { }
}
exports.default = VideosController;
//# sourceMappingURL=VideosController.js.map