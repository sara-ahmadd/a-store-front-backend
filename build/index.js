"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_config_1 = __importDefault(require("./dotenv.config"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
//create an instance app.
const app = (0, express_1.default)();
//using morgan : http logger middlware.
app.use((0, morgan_1.default)("common"));
//using helmet : http security middleware.
app.use((0, helmet_1.default)());
//create simple api to the app homepage.
app.get("/home", (_req, res) => {
    res.send("Hello from homepage!!");
});
//custom middleware handle requesting unavailable route.
app.use((_req, res) => {
    res.status(404).json({
        message: "This Route Doesnot Exist!!"
    });
});
//using a custom middleware to handdle global errors.
app.use((error, req, res, next) => {
    const message = error.message ||
        'Somthing Wronge Happened While Processing Your Request!!!';
    res.status(400).json(message);
    next();
});
const port = dotenv_config_1.default.port;
//create a local server.
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});
