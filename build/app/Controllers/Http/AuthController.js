"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Redis"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Email_1 = __importDefault(require("../../Service/Email"));
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
class AuthController {
    async register({ request, auth, response, session }) {
        const user = request.only(["email", "password", "name", "id", "gravatar"]);
        user.email = user.email.toLowerCase();
        user.gravatar = "https://www.gravatar.com/avatar/" + crypto.createHash('md5').update(user.email).digest('hex');
        var data = await User_1.default.query().where("email", user.email).first();
        if (data) {
            session.flash('errors', "Email telah digunakan");
            return response.redirect().back();
        }
        user.password = await Hash_1.default.make(user.password);
        let Newuser = await User_1.default.create(user);
        await auth.use('web').login(Newuser);
        return response.redirect('/');
    }
    async registerFromLP({ request, auth, response }) {
        const user = request.only(["email", "password", "name", "id"]);
        user.email = user.email.toLowerCase();
        var data = await User_1.default.query().where("email", user.email).first();
        if (data) {
            return response.abort("Email telah digunakan", 409);
        }
        user.id = (0, uuid_1.v4)();
        user.password = await Hash_1.default.make(user.password);
        await User_1.default.create(user);
        await auth.use('web').loginViaId(user.id.toString());
        return response.redirect("/whatsapp");
    }
    extractEmails(text) {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }
    async registerFromWA({ request }) {
        const message = request.input("message");
        let string = message.conversation;
        const key = request.input("key");
        const phone = key.remoteJid.split("@")[0];
        if (!string && message.extendedTextMessage) {
            string = message.extendedTextMessage.text;
        }
        const emails = this.extractEmails(string);
        if (emails) {
            var data = await User_1.default.query().where("email", emails[0]).first();
            if (data) {
                const text = `Maaf, email ${emails[0]} telah digunakan, silakan registrasi dengan email lainnya`;
                axios_1.default.post("http://api.dripsender.id/send", {
                    api_key: "8026226b-28c5-40b4-910a-eda2d3804bc8",
                    text: text,
                    phone
                });
            }
            else {
                const plainPass = (Math.random() + 1).toString(36).substring(2);
                const pass = await Hash_1.default.make(plainPass);
                let user = {
                    id: (0, uuid_1.v4)(),
                    name: request.input("pushName"),
                    email: emails[0],
                    password: pass
                };
                await User_1.default.create(user);
                const code = (0, uuid_1.v4)();
                await Redis_1.default.setex("reset-password:" + code, 3600 * 24 * 5, user.id);
                const text = `Selamat ${user.name} 🤝🏻 
        
anda berhasil mendaftar di dripsender. silakan klik link berikut untuk membuat password baru

https://app.dripsender.id/make-password/${code}
        `;
                axios_1.default.post("http://api.dripsender.id/send", {
                    api_key: "8026226b-28c5-40b4-910a-eda2d3804bc8",
                    text: text,
                    phone
                });
            }
        }
        return 'ok';
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect("/login");
    }
    async login({ request, auth, response, session }) {
        const email = request.input('email').toLowerCase();
        const password = request.input('password');
        var user = await User_1.default.query().where("email", email).first();
        if (!user) {
            session.flash('errors', "Email tidak ada");
            return response.redirect().back();
        }
        if (!(await Hash_1.default.verify(user.password, password))) {
            session.flash('errors', "Invalid credentials");
            return response.redirect().back();
        }
        await auth.use('web').login(user);
        return response.redirect('/');
        ;
    }
    async resetpassword({ request, response, session }) {
        const email = request.input('email').toLowerCase();
        var user = await User_1.default.query().where("email", email).first();
        if (user) {
            let code = Math.random().toString(36).substr(3, 35);
            await Redis_1.default.setex("reset-password:" + code, 3600, user.id);
            const html = await View_1.default.render('email/forgot-password', {
                name: user.name,
                unsubscribe_url: Env_1.default.get('APP_URL') + '/unsubscribe',
                RESET_URL: Env_1.default.get('APP_URL') + '/reset-password/' + code
            });
            (0, Email_1.default)({
                "Messages": [
                    {
                        "From": {
                            "Email": "arief@app.dripsender.id",
                            "Name": "Arief - Dripsender"
                        },
                        "To": [
                            {
                                "Email": user.email,
                                "Name": user.name
                            }
                        ],
                        "Subject": "Reset Password Drip",
                        "HTMLPart": html
                    }
                ]
            });
            session.flash("message", "Link Reset Password dikirim ke Email anda");
            return response.redirect().back();
        }
        else {
            session.flash("errors", "Email tidak ditemukan");
            return response.redirect().back();
        }
    }
    async sendVerification({ auth, response, session }) {
        if (auth.user) {
            var user = auth.user;
            await Redis_1.default.setex("verifikasi-user:" + user.id, 3600, user.id);
            const html = await View_1.default.render('email/send-verification', {
                name: user.name,
                VERIFICATION_URL: Env_1.default.get('APP_URL') + '/verify-user/' + user.id
            });
            (0, Email_1.default)({
                "Messages": [
                    {
                        "From": {
                            "Email": "arief@app.dripsender.id",
                            "Name": "Arief - Dripsender"
                        },
                        "To": [
                            {
                                "Email": user.email,
                                "Name": user.name
                            }
                        ],
                        "Subject": "Aktifkan Akun Anda",
                        "HTMLPart": html
                    }
                ]
            });
            session.flash('message', 'Email Verifikasi telah dikirim');
            return response.redirect().back();
        }
        else {
            session.flash('errors', 'User tidak ditemukan');
            return response.redirect().back();
        }
    }
    async registerOrLoginGoogleAuth({ request, response, auth, session }) {
        if (!request.input('idToken')) {
            session.flash('errors', "ID Token tidak ada");
            return response.redirect().back();
        }
        try {
            const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: request.input('idToken'),
                audience: CLIENT_ID,
            });
            const googleuser = ticket.getPayload();
            let GetUser = await User_1.default.query().where("email", googleuser.email).first();
            if (GetUser) {
                await auth.use('web').loginViaId(GetUser.id.toString());
                return 'ok';
            }
            else {
                let user = {
                    id: (0, uuid_1.v4)(),
                    name: googleuser.name,
                    email: googleuser.email,
                    is_verified: true,
                    password: Math.random().toString(26)
                };
                user.password = await Hash_1.default.make(user.password);
                await User_1.default.create(user);
                await auth.use('web').loginViaId(user.id.toString());
                return 'ok';
            }
        }
        catch (error) {
            return response.redirect().back();
        }
    }
    async verifyReset({ params, response, view }) {
        if (params.id) {
            const id = await Redis_1.default.get("reset-password:" + params.id);
            if (id) {
                return view.render("auth/verify-password", { id: params.id });
            }
            else {
                return response.badRequest('Cridential Not Found');
            }
        }
        else {
            return response.badRequest('Cridential Not Found');
        }
    }
    async makePassword({ request, response, auth, session }) {
        if (request.input('id')) {
            const user_id = await Redis_1.default.get("reset-password:" + request.input('id'));
            if (user_id) {
                const user = await User_1.default.find(user_id);
                if (user) {
                    user.password = await Hash_1.default.make(request.input('password'));
                    user.save();
                    await auth.use('web').loginViaId(user.id);
                    await Redis_1.default.del("reset-password:" + request.input('id'));
                    session.flash("message", "reset password berhasil");
                    return response.redirect('/whatsapp');
                }
                else {
                    return response.badRequest('Cridential Not Found');
                }
            }
            else {
                return response.badRequest('Cridential Not Found');
            }
        }
        else {
            return response.badRequest('Cridential Not Found');
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map