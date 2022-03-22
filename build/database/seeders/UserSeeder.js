"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const crypto = require('crypto');
class UserSeederSeeder extends Seeder_1.default {
    async run() {
        console.log("fill user data");
        const password = Math.random().toString(36).slice(-8);
        let data = {
            name: process.env.FIRST_USER_NAME,
            email: process.env.FIRST_USER_EMAIL,
            password: password,
            gravatar: "https://www.gravatar.com/avatar/" + crypto.createHash('md5').update(process.env.FIRST_USER_EMAIL).digest('hex')
        };
        data.password = await Hash_1.default.make(data.password);
        await User_1.default.create(data);
        console.log(data.email);
        console.log(password);
    }
}
exports.default = UserSeederSeeder;
//# sourceMappingURL=UserSeeder.js.map