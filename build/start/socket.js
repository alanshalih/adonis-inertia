"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Redis"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Service/Ws"));
Ws_1.default.boot();
const url = require('url');
let bcViewer = {};
let peakView = {};
setInterval(() => {
    bcViewer = {};
}, 5 * 60000);
Ws_1.default.io.on('connection', async (socket, request) => {
    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);
    socket.id = queryObject.id;
    socket.room = queryObject.event_id;
    const concurrent = await Redis_1.default.incr("concurrent-viewer:" + socket.room);
    await Redis_1.default.sadd("viewer_id:" + socket.room, socket.id);
    if (peakView[socket.room]) {
        if (concurrent > peakView[socket.room]) {
            peakView[socket.room] = concurrent;
            const peak = await Redis_1.default.get("peak-viewer:" + socket.room);
            ;
            if (peak) {
                if (concurrent > parseInt(peak))
                    await Redis_1.default.set("peak-viewer:" + socket.room, concurrent);
            }
            else {
                await Redis_1.default.set("peak-viewer:" + socket.room, concurrent);
            }
        }
    }
    else {
        peakView[socket.room] = concurrent;
    }
    if (!bcViewer[socket.room]) {
        bcViewer[socket.room] = true;
        Redis_1.default.publish("jam-communication:" + process.env.PORT, JSON.stringify({
            room: socket.room,
            sender_id: socket.id,
            concurrent: concurrent
        }));
    }
    socket.send(JSON.stringify({
        room: socket.room,
        concurrent: concurrent
    }));
    socket.on('close', async () => {
        await Redis_1.default.decr("concurrent-viewer:" + socket.room);
        await Redis_1.default.srem("viewer_id:" + socket.room, socket.id);
    });
    socket.on('message', function (msg) {
        Redis_1.default.publish("jam-communication:" + process.env.PORT, msg);
    });
});
Redis_1.default.subscribe("jam-communication:" + process.env.PORT, (msg) => {
    const message = JSON.parse(msg);
    Ws_1.default.io.clients.forEach(function (client) {
        if (client.id !== message.sender_id && client.room == message.room) {
            client.send(msg);
        }
        ;
    });
});
//# sourceMappingURL=socket.js.map