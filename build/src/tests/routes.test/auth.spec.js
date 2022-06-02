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
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = "";
exports.token = token;
const user = {
    email: "testEmail@email.com",
    firstname: "first",
    lastname: "last",
    password: "test123",
};
describe("authentication", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userId = yield userModel.create(user);
        user.id = userId.id;
    }));
    it("Authenticate to get token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post("/users/authenticate")
            .set("content-type", "application/json")
            .send({
            email: "testEmail@email.com",
            password: "test123",
        });
        const { email, jwtToken } = res.body.data;
        expect(res.status).toBe(200);
        expect(email).toEqual(user.email);
        exports.token = token = jwtToken;
    }));
});
