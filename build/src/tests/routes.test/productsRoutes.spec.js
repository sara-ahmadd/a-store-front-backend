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
const request = (0, supertest_1.default)(index_1.default);
const newProduct = {
    name: "product-one",
    price: 20,
};
describe("test route to /products/", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sqlproduct = "DELETE FROM products";
        const alterorder = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
        yield connection.query(sqlproduct);
        yield connection.query(alterorder);
        connection.release();
    }));
    describe("ROUTES TO PRODUCTS", () => {
        it("create product", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post("/products/create/product")
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                name: "product-one",
                price: 20,
            });
            expect(res.status).toBe(200);
            const { name, price } = res.body.data;
            expect(name).toEqual(newProduct.name);
            expect(price).toEqual(newProduct.price);
        }));
        it("get product", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/products/show/${1}`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(res.status).toBe(200);
            const { name, price } = res.body.data;
            expect(name).toEqual(newProduct.name);
            expect(price).toEqual(newProduct.price);
        }));
        it("get all products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/products/index`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toEqual(1);
        }));
        it("edit products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/products/edit`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                name: "product-one-edited",
                price: 20,
                id: 1,
            });
            expect(res.status).toBe(200);
            const { name, price } = res.body.data;
            expect(name).toEqual("product-one-edited");
            expect(price).toEqual(newProduct.price);
        }));
        it("delete products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/products/delete/${1}`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                name: "product-one-edited",
                price: 20,
            });
            expect(res.status).toBe(200);
            const { name, price, id } = res.body.data;
            expect(name).toEqual("product-one-edited");
            expect(price).toEqual(newProduct.price);
            expect(id).toEqual(1);
        }));
    });
});
