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
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const user_authorization_1 = require("../../middlewares/user.authorization");
const order = new orders_model_1.default();
const orderRoute = (0, express_1.Router)();
//route to create order.
orderRoute.post("/create/order", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdOrder = yield order.create(req.body);
        res.json({ data: createdOrder });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//route to get orders of an authorized user by his id and token provided with the request.
orderRoute.get("/index/", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersArray = yield order.index();
        res.json({ data: ordersArray });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//route to edit orders of an authorized user and token is provided with the request.
orderRoute.patch("/edit", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedOrder = yield order.edit(req.body);
        res.json({ data: editedOrder });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//route to get current order of an authorized user by his id and token provided with the request.
orderRoute.get("/show/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentOrder = yield order.show(req.params.id);
        res.json({ data: currentOrder });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
//route to delete order of an authorized user by his id and token provided with the request.
orderRoute.delete("/delete/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield order.delete(req.params.id);
        res.json({ data: deletedOrder });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
exports.default = orderRoute;
