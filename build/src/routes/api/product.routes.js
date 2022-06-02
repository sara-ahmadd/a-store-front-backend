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
const product_model_1 = __importDefault(require("../../models/product.model"));
const user_authorization_1 = require("../../middlewares/user.authorization");
const product = new product_model_1.default();
const productRoute = (0, express_1.Router)();
productRoute.post("/create/product", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield product.createProduct(req.body);
        res.json({ data: newProduct });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
productRoute.get("/index", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsArray = yield product.getAllProducts();
        res.json({ data: productsArray });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
productRoute.get("/show/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showProduct = yield product.getOne(req.params.id);
        res.json({ data: showProduct });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
productRoute.patch("/edit", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedProduct = yield product.updateOne(req.body);
        res.json({ data: editedProduct });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
productRoute.delete("/delete/:id", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product.deleteOne(req.params.id);
        res.json({ data: deletedProduct });
    }
    catch (err) {
        throw new Error(`cannot process your request:${err}`);
    }
}));
exports.default = productRoute;
