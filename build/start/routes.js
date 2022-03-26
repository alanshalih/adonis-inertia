"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/login', async ({ inertia, auth, response }) => {
    await auth.use('web').check();
    if (auth.use('web').isLoggedIn) {
        return response.redirect("/");
    }
    else {
        return inertia.render('Login');
    }
});
Route_1.default.group(() => {
    Route_1.default.get('/', 'EventsController.index');
    Route_1.default.resource('/event', 'EventsController');
    Route_1.default.resource('/event/:event_id/video', 'VideosController');
    Route_1.default.put("/event/:event_id/edit", "EventsController.edit");
    Route_1.default.post('/upload', 'UploadFilesController.upload');
    Route_1.default.post('/logout', 'AuthController.logout');
    Route_1.default.get('/register', async ({ inertia }) => {
        return inertia.render('Register');
    });
    Route_1.default.post('register', 'AuthController.register');
}).middleware('auth');
Route_1.default.post('login', 'AuthController.login');
Route_1.default.get("/:id", "ViewersController.optin");
Route_1.default.get("/view/:id", "ViewersController.view");
Route_1.default.post("/view/:event_id", "ViewersController.registerViewer");
Route_1.default.get("/api/register/:event_id", "ViewersController.registerViewer");
Route_1.default.get("/comment/:event_id", "CommentsController.index");
Route_1.default.post("/comment", "CommentsController.store");
Route_1.default.post("/like/:id", "CommentsController.like");
//# sourceMappingURL=routes.js.map