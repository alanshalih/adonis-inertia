"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Event"));
const Video_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Video"));
class EventsController {
    async index({ inertia }) {
        const events = await Event_1.default.all();
        return inertia.render('Home', { events });
    }
    async create({ inertia }) {
        return inertia.render("CreateEvent");
    }
    async store({ request, response }) {
        let data = request.all();
        const result = await Event_1.default.create(data);
        return response.redirect("/event/" + result.id + '/edit');
    }
    async show({ inertia }) {
        return inertia.render("ShowEvent");
    }
    async edit({ inertia, params }) {
        const form = await Event_1.default.find(params.id);
        if (form) {
            const videos = await Video_1.default.query().where("event_id", form.id);
            return inertia.render("EditEvent", { form, videos });
        }
    }
    async update({ params, request }) {
        await Event_1.default.query().where('id', params.id).update(request.except(['id']));
    }
    async destroy({}) { }
}
exports.default = EventsController;
//# sourceMappingURL=EventsController.js.map