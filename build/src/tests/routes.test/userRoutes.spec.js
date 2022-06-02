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
const dbconnection_1 = __importDefault(require("../../database/dbconnection"));
const supertest_1 = __importDefault(require("supertest"));
const auth_spec_1 = require("./auth.spec");
const index_1 = __importDefault(require("../../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("TEST USER ROUTES", () => {
    const user = {
        email: "testEmail2@email.com",
        firstname: "first2",
        lastname: "last2",
        password: "test123",
    };
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sql = "DELETE FROM users";
        const alter = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
        yield connection.query(sql);
        yield connection.query(alter);
        connection.release();
    }));
    describe("TEST CRUD API ROUTES.", () => {
        it("test creation route.", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post("/users/create")
                .set("content-type", "application/json")
                .send(Object.assign({}, user));
            const { email, firstname, lastname } = res.body.data;
            expect(res.status).toBe(200);
            expect(email).toBe(user.email);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);
        }));
        it("test update route", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch(`/users/edit`)
                .set("content-type", "Application/json")
                .set("Authorization", `Bearer ${auth_spec_1.token}`)
                .send({
                firstname: "first2Update",
                email: "testEmail2@email.com",
                lastname: "last2",
                id: 1,
            });
            const { firstname } = res.body.data;
            expect(res.status).toBe(200);
            expect(firstname).toBe("first2Update");
        }));
        it("test getAllUsers route.", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get("/users/index")
                .set("Content-type", "application/json")
                .set("Authorization", `Bearer ${auth_spec_1.token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(1);
        }));
        it("test get one User route.", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/show/1`)
                .set("content-type", "application/json")
                .set("Authorization", `Bearer ${auth_spec_1.token}`);
            expect(res.status).toBe(200);
            const { email, firstname, lastname } = res.body.data;
            expect(email).toBe(user.email);
            expect(firstname).toBe("first2Update");
            expect(lastname).toBe(user.lastname);
        }));
        it("test delete one User route.", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete(`/users/delete/1`)
                .set("content-type", "application/json")
                .set("Authorization", `Bearer ${auth_spec_1.token}`);
            const { email, firstname, lastname } = res.body.data;
            expect(res.status).toBe(200);
            expect(email).toBe(user.email);
            expect(firstname).toBe("first2Update");
            expect(lastname).toBe(user.lastname);
        }));
    });
});
