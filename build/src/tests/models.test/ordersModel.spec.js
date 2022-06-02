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
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
const orderModel = new orders_model_1.default();
//test create method in ProductModel.
describe("Test ORDER MODEL methods to be defined.", () => {
    it("test create method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderModel.create).toBeDefined();
    }));
    it("test get all orders method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderModel.index).toBeDefined();
    }));
    it("test get one order method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(orderModel.show).toBeDefined();
    }));
});
describe("Test ORDER MODEL  methods to run properly.", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            email: "testEmail@email.com",
            firstname: "first",
            lastname: "last",
            password: "test123",
        };
        const result = yield userModel.create(user);
        user.id = result.id;
    }));
    const order = {
        status: "active",
        user_id: 1,
    };
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sql = "DELETE FROM orders";
        const alter = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
        yield connection.query(sql);
        yield connection.query(alter);
        connection.release();
    }));
    //test create method.
    it("Create method return created order", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield orderModel.create(order);
        expect(createdOrder.id).toEqual(1);
        expect(parseInt(createdOrder.user_id)).toEqual(order.user_id);
        expect(createdOrder.status).toEqual(order.status);
    }));
    //test getAllorders method.
    it("Get All Orders method return all orders.", () => __awaiter(void 0, void 0, void 0, function* () {
        const ordersArray = yield orderModel.index();
        expect(ordersArray.length).toBe(1);
    }));
    //test get one product method.
    it("Get One order method return specific order based on id.", () => __awaiter(void 0, void 0, void 0, function* () {
        const specificOrder = yield orderModel.show(order.user_id);
        expect(specificOrder.id).toEqual(1);
        expect(parseInt(specificOrder.user_id)).toEqual(order.user_id);
        expect(specificOrder.status).toEqual(order.status);
    }));
});
