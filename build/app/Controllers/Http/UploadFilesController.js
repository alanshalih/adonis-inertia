"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadFilesController {
    async upload({ request }) {
        const coverImage = request.file('file', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif'],
        });
        await coverImage.moveToDisk('../../public/images');
        return "/images/" + coverImage.fileName;
    }
}
exports.default = UploadFilesController;
//# sourceMappingURL=UploadFilesController.js.map