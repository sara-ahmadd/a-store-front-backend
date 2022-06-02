"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_config_1 = __importDefault(require("../../dotenv.config"));
//a function to use the returned token to the client with requests sent by the client.
const authorized = (req, _res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader) {
        const bearer = authorizationHeader.split(" ")[0].toLowerCase();
        const token = authorizationHeader.split(" ")[1];
        if (bearer === "bearer" && token) {
            const decodeToken = jsonwebtoken_1.default.verify(token, dotenv_config_1.default.webtoken);
            if (decodeToken) {
                next();
            }
            else {
                throw new Error("the user isnot verified");
            }
        }
        else {
            throw new Error("the user isnot verified");
        }
    }
    else {
        throw new Error("the user isnot verified");
    }
};
exports.authorized = authorized;
