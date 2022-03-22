"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailjet = require('node-mailjet')
    .connect('19204cd5a9a5aa33fb41bb0db40b8a60', 'd595c3d150c9dc3444284ad7fd93c9a4');
function default_1(config) {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request(config);
    request
        .then((result) => {
        console.log(result.body);
    })
        .catch((err) => {
        console.log(err.statusCode);
    });
}
exports.default = default_1;
//# sourceMappingURL=Email.js.map