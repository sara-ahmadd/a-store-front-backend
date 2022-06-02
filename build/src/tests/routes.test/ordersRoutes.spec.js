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
describe("afterAll orders", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sql = "DELETE FROM users";
        const alter = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
        const sqlorder = "DELETE FROM orders";
        const alterorder = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
        yield connection.query(sqlorder);
        yield connection.query(alterorder);
        yield connection.query(sql);
        yield connection.query(alter);
        connection.release();
    }));
    describe("ROUTES TO ORDERS", () => {
        it("/orders/create/order", () => __awaiter(void 0, void 0, void 0, function* () {
            const order = {
                status: "active",
                user_id: 1,
            };
            const response = yield request
                .post("/orders/create/order")
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                status: "active",
                user_id: 1,
            });
            expect(response.status).toBe(200);
            const { status, user_id } = response.body.data;
            expect(status).toBe(order.status);
            expect(parseInt(user_id)).toBe(order.user_id);
        }));
        it("/orders/show/id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/orders/show/1`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(response.status).toBe(200);
            const { status, user_id } = response.body.data;
            expect(status).toBe("active");
            expect(parseInt(user_id)).toBe(1);
        }));
        it("/orders/index", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/orders/index`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(response.status).toBe(200);
            expect(response.body.data.length).toEqual(1);
        }));
        it("/orders/edit/", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch(`/orders/edit`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                status: "complete",
                user_id: 1,
            });
            expect(response.status).toBe(200);
            const { status, user_id } = response.body.data;
            expect(status).toBe("complete");
            expect(parseInt(user_id)).toBe(1);
        }));
        it("/orders/delete/id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/orders/delete/${1}`)
                .set("content-type", "application/json")
                .set("authorization", `Bearer ${auth_spec_1.token}`);
            expect(response.status).toBe(200);
            const { status, user_id } = response.body.data;
            expect(status).toBe("complete");
            expect(parseInt(user_id)).toBe(1);
        }));
    });
});
