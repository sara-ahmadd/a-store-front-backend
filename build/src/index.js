"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_config_1 = __importDefault(require("../dotenv.config"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes/routes"));
const path_1 = __importDefault(require("path"));
//create a rate limiting object.
const rate = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "too many requests from this ip , try again later",
};
//create an instance app.
const app = (0, express_1.default)();
//using ratelimit middleware.
app.use((0, express_rate_limit_1.default)(rate));
app.use(express_1.default.json());
//using morgan : http logger middlware.
app.use((0, morgan_1.default)("common"));
//using helmet : http security middleware.
app.use((0, helmet_1.default)());
//create simple api to the app homepage.
app.use("/", routes_1.default);
//custom middleware handle requesting unavailable route.
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({
//     message: "This Route Doesnot Exist!!",
//   });
// });
app.use(express_1.default.static(path_1.default.join(__dirname, 'statics')));
//using a custom middleware to handdle global errors.
app.use((error, req, res, next) => {
    const message = error.message ||
        "Somthing Wronge Happened While Processing Your Request!!!";
    res.status(400).json(message);
    next();
});
const port = dotenv_config_1.default.port;
//create a local server.
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});
exports.default = app;
