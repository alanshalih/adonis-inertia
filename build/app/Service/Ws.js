"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Server_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Server"));
class Ws {
    constructor() {
        this.booted = false;
    }
    boot() {
        if (this.booted) {
            return;
        }
        this.booted = true;
        this.io = new ws_1.WebSocketServer({ server: Server_1.default.instance });
    }
}
exports.default = new Ws();
//# sourceMappingURL=Ws.js.map