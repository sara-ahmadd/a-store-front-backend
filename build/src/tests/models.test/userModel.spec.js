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
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
//test create method in usermodel.
describe("Test USER MODEL methods to be defined.", () => {
    it("test create method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(userModel.create).toBeDefined();
    }));
    it("test update method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(userModel.updateOne).toBeDefined();
    }));
    it("test get all users method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(userModel.getAllUsers).toBeDefined();
    }));
    it("test get one user method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(userModel.getOne).toBeDefined();
    }));
    it("test delete method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(userModel.deleteOne).toBeDefined();
    }));
});
describe("Test USER MODEL methods to run properly.", () => {
    const user = {
        email: "testEmail2@email.com",
        firstname: "first",
        lastname: "last",
        password: "test123",
    };
    const secondUser = {
        email: "testEmail3@email.com",
        firstname: "first",
        lastname: "last",
        password: "test123",
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel.create(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sqlUser = "DELETE FROM users";
        const alterUser = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
        yield connection.query(sqlUser);
        yield connection.query(alterUser);
        connection.release();
    }));
    //test create method.
    it("Create method return created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.create(secondUser);
        expect(createdUser.id).toEqual(3);
        expect(createdUser.email).toEqual(secondUser.email);
        expect(createdUser.firstname).toEqual(secondUser.firstname);
        expect(createdUser.lastname).toEqual(secondUser.lastname);
    }));
    //test update method.
    it("Update method return updated user.", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield userModel.updateOne(Object.assign(Object.assign({}, secondUser), { firstname: "updated-first-name", id: 3 }));
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstname).toEqual("updated-first-name");
    }));
    //test getAllUsers method.
    it("Get All Users method return all users.", () => __awaiter(void 0, void 0, void 0, function* () {
        const usersArray = yield userModel.getAllUsers();
        expect(usersArray.length).toBe(3);
    }));
    //test get one user method.
    it("Get One User method return specific user based on id.", () => __awaiter(void 0, void 0, void 0, function* () {
        const specificUser = yield userModel.getOne(2);
        expect(specificUser.email).toEqual(user.email);
        expect(specificUser.firstname).toEqual(user.firstname);
        expect(specificUser.lastname).toEqual(user.lastname);
    }));
    it("Authenticate method return authenticated user", () => __awaiter(void 0, void 0, void 0, function* () {
        const authUser = yield userModel.authenticate("testEmail2@email.com", "test123");
        expect(authUser === null || authUser === void 0 ? void 0 : authUser.id).toEqual(2);
        expect(authUser === null || authUser === void 0 ? void 0 : authUser.email).toEqual(user.email);
        expect(authUser === null || authUser === void 0 ? void 0 : authUser.firstname).toEqual(user.firstname);
        expect(authUser === null || authUser === void 0 ? void 0 : authUser.lastname).toEqual(user.lastname);
    }));
    it("Authenticate method return null with unvalid user.", () => __awaiter(void 0, void 0, void 0, function* () {
        const authUser = yield userModel.authenticate("fake@email", "fakePassword");
        expect(authUser).toBeNull();
    }));
    //test delete method.
    it("Delete method should return data of deleted user based on id.", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield userModel.deleteOne(2);
        expect(deletedUser.email).toEqual(user.email);
        expect(deletedUser.firstname).toEqual(user.firstname);
        expect(deletedUser.lastname).toEqual(user.lastname);
    }));
});
