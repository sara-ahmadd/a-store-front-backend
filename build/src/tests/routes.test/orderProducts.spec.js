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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const auth_spec_1 = require("./auth.spec");
const dbconnection_1 = __importDefault(require("../../database/dbconnection"));
const order_products_model_1 = __importDefault(require("../../models/order_products.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const product1 = new product_model_1.default();
const createOrder = new orders_model_1.default();
const orderProduct = new order_products_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
const newProd = {
    name: "product",
    price: 40,
};
const order1 = {
    status: "active",
    user_id: 1,
};
describe("afterAll ORDER_PRODUCTS", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield product1.createProduct(newProd);
        yield createOrder.create(order1);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sql = "DELETE FROM orders";
        const alter = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
        const sqlproduct = "DELETE FROM products";
        const alterproduct = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
        const sqlorder = "DELETE FROM order_products";
        const alterorder = "ALTER SEQUENCE order_products_id_seq RESTART WITH 1";
        yield connection.query(sqlorder);
        yield connection.query(alterorder);
        yield connection.query(sql);
        yield connection.query(alter);
        yield connection.query(sqlproduct);
        yield connection.query(alterproduct);
        connection.release();
    }));
    describe("ROUTES TO ORDER_PRODUCTS", () => {
        it("creat products in an order(/cart/orders-products/:id/products)", () => __awaiter(void 0, void 0, void 0, function* () {
            const orderP = {
                quantity: 70,
                Order_id: 1,
                Product_id: 1,
            };
            const response = yield request
                .post("/cart/orders-products/1/products")
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                quantity: 70,
                Product_id: 1,
            });
            expect(response.status).toBe(200);
            const { quantity, id } = response.body.data;
            expect(quantity).toBe(orderP.quantity);
            expect(parseInt(id)).toBe(1);
        }));
        it("/cart/orders-products/1/products/show", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/cart/orders-products/1/products/show`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(response.status).toBe(200);
            const { quantity, id } = response.body.data;
            expect(quantity).toBe(70);
            expect(parseInt(id)).toBe(1);
        }));
        it("/cart/orders-products/1/products/edit", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch(`/cart/orders-products/1/products/edit`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                quantity: 900,
                Product_id: 1,
            });
            expect(response.status).toBe(200);
            const { quantity, id } = response.body.data;
            expect(quantity).toBe(900);
            expect(parseInt(id)).toBe(1);
        }));
    });
});
