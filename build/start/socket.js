"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Service/Ws"));
Ws_1.default.boot();
const url = require('url');
Ws_1.default.io.on('connection', (socket, request) => {
    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);
    socket.on('close', function close() {
        console.log('disconnected');
    });
});
//# sourceMappingURL=socket.js.map