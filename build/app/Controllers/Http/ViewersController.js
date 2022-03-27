"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Redis"));
const Attendee_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Attendee"));
const Event_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Event"));
const Video_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Video"));
const crypto = require('crypto');
class ViewersController {
    async optin({ view, params, request, response }) {
        const event = await Event_1.default.query().where("slug", params.id).first();
        if (event) {
            const viewer_id = request.cookie('viewer-' + event.id);
            if (viewer_id) {
                return response.redirect("/view/" + viewer_id);
            }
            else {
                const body_script = event.body_script;
                event.body_script = '';
                const head_script = event.head_script;
                event.head_script = '';
                return view.render("optin", { event, body_script, head_script });
            }
        }
        else {
            return "Page Not Found";
        }
    }
    async validatePhone(phone) {
        if (!phone) {
            return phone;
        }
        let selected_dial_code = '+62';
        var number = phone.toString().split('-').join(' ').split(' ').join('');
        if (number[0] == '0') {
            number = number.replace('0', '');
        }
        if (number.includes(selected_dial_code)) {
            number = number.replace(selected_dial_code, '');
        }
        if (number.substring(0, selected_dial_code.length - 1) == selected_dial_code.replace("+", '')) {
            number = number.replace(selected_dial_code.replace("+", ''), '');
        }
        number = selected_dial_code.replace("+", '') + number;
        return number;
    }
    async registerViewer({ params, request, response }) {
        let identifier;
        const phone = request.input("phone") ? await this.validatePhone(request.input("phone")) : '';
        if (request.input("identifier")) {
            if (request.input("identifier") == 'phone')
                identifier = phone;
            else
                identifier = request.input("email");
        }
        else {
            const event = await Event_1.default.find(params.event_id);
            if (event) {
                if (event.id_identifier == 'phone')
                    identifier = phone;
                else
                    identifier = request.input("email");
            }
        }
        const id = crypto.createHash('md5').update(identifier + params.event_id).digest('hex');
        let viewer = await Attendee_1.default.find(id);
        if (viewer) {
        }
        else {
            let gravatar;
            if (request.input("email")) {
                gravatar = "https://www.gravatar.com/avatar/" + crypto.createHash('md5').update(request.input("email")).digest('hex');
            }
            else {
                gravatar = "https://ui-avatars.com/api/?background=random&name=" + (request.input("name").split(" ").join("+"));
            }
            await Attendee_1.default.create({
                id,
                name: request.input("name"),
                email: request.input("email"),
                phone: phone.toString(),
                event_id: params.event_id,
                gravatar
            });
        }
        return response.cookie('viewer-' + params.event_id, id).redirect("/view/" + id);
    }
    async view({ view, params }) {
        const viewer = await Attendee_1.default.query().where("id", params.id).first();
        if (viewer) {
            const event = await Event_1.default.find(viewer.event_id);
            await Redis_1.default.incr("total-viewer:" + viewer.event_id);
            let videos;
            if (event) {
                videos = await Video_1.default.query().where("event_id", event.id);
                if (!videos) {
                    videos = [];
                }
                if (videos.length === 1) {
                    videos = [];
                }
                const body_script = event.body_script;
                event.body_script = '';
                const head_script = event.head_script;
                event.head_script = '';
                return view.render("optin", { viewer, event, body_script, head_script, videos });
            }
        }
        else {
            return "Page Not Found";
        }
    }
}
exports.default = ViewersController;
//# sourceMappingURL=ViewersController.js.map