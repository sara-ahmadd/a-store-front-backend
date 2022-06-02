"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_config_1 = __importDefault(require("../../../dotenv.config"));
const user_authorization_1 = require("../../middlewares/user.authorization");
const user = new user_model_1.default();
const userRoute = (0, express_1.Router)();
//catch (err) {
//throw new Error(`cannot process your request:${err}`);
//}
userRoute.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user.create(req.body);
        res.json({ data: newUser });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//use authorization middleware to send jsonwebtoken with get request to retrieve data of all users.
userRoute.get("/index", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const indexUsers = yield user.getAllUsers();
        res.json({ data: indexUsers });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//use authorization middleware to send jsonwebtoken with get request to retrieve data of a specific user.
userRoute.get("/show/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showUser = yield user.getOne(req.params.id);
        res.json({ data: showUser });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//use authorization middleware to send jsonwebtoken with get request to update data of specific user.
userRoute.patch("/edit", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedUser = yield user.updateOne(req.body);
        res.json({ data: editedUser });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//use authorization middleware to send jsonwebtoken with get request to delete data of specific user.
userRoute.delete("/delete/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user.deleteOne(req.params.id);
        res.json({ data: deletedUser });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
userRoute.post("/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const authenticateUser = yield user.authenticate(email, password);
        const jwtToken = jsonwebtoken_1.default.sign({ authenticateUser }, dotenv_config_1.default.webtoken);
        if (!authenticateUser) {
            res.status(404).json({
                status: "failed",
                message: "The User With This Email & Password Is Unvalid",
            });
        }
        else {
            res.json({
                status: "success",
                message: "User Data Is Authenticated and Authorized",
                data: Object.assign(Object.assign({}, authenticateUser), { jwtToken }),
            });
        }
    }
    catch (error) {
        throw new Error("An Error Happened On Authenticating Your Password or Email");
    }
}));
exports.default = userRoute;
