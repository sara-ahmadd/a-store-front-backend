"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const user_authorization_1 = require("../../middlewares/user.authorization");
const order_products_model_1 = __importDefault(require("../../models/order_products.model"));
const order = new order_products_model_1.default();
const orderproductRoute = (0, express_1.Router)();
orderproductRoute.use(express_1.default.json());
orderproductRoute.post("/orders-products/:id/products", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedProduct = {
            quantity: req.body.quantity,
            Order_id: req.params.id,
            Product_id: req.body.product_id,
        };
        const newaddedProduct = yield order.addProduct(addedProduct);
        res.json({ data: newaddedProduct });
    }
    catch (err) {
        throw new Error("error in getting required data");
    }
}));
//route to edit products in an an order.
orderproductRoute.patch("/orders-products/:id/products/edit", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = {
            quantity: req.body.quantity,
            Order_id: req.params.id,
            Product_id: req.body.product_id,
        };
        const newProduct = yield order.updateProducts(updatedProduct);
        res.json({ data: newProduct });
    }
    catch (err) {
        throw new Error(`404 user error:${err}`);
    }
}));
//route to get all products in an order.
orderproductRoute.get("/orders-products/:id/products/show", user_authorization_1.authorized, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnedOrder = yield order.getOrderProducts(req.params.id);
        res.json({ data: returnedOrder });
    }
    catch (err) {
        throw new Error(`cannot process your request :${err}`);
    }
}));
exports.default = orderproductRoute;
