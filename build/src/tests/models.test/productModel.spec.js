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
const product_model_1 = __importDefault(require("../../models/product.model"));
const productModel = new product_model_1.default();
//test create method in ProductModel.
describe("Test PRODUCT MODEL methods to be defined.", () => {
    it("test create method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(productModel.createProduct).toBeDefined();
    }));
    it("test update method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(productModel.updateOne).toBeDefined();
    }));
    it("test get all products method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(productModel.getAllProducts).toBeDefined();
    }));
    it("test get one product method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(productModel.getOne).toBeDefined();
    }));
    it("test delete method.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(productModel.deleteOne).toBeDefined();
    }));
});
describe("Test PRODUCT MODEL  methods to run properly.", () => {
    const product = {
        name: "product-one",
        price: 20.0,
    };
    const secProduct = {
        name: "product-two",
        price: 20.0,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield productModel.createProduct(product);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield dbconnection_1.default.connect();
        const sql = "DELETE FROM products";
        const alter = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
        yield connection.query(sql);
        yield connection.query(alter);
        connection.release();
    }));
    //test create method.
    it("Create method return created product", () => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield productModel.createProduct(secProduct);
        expect(createdProduct.id).toEqual(2);
        expect(createdProduct.name).toEqual(secProduct.name);
        expect(createdProduct.price).toEqual(secProduct.price);
    }));
    //test update method.
    it("Update method return updated user.", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProduct = yield productModel.updateOne({
            name: "product-two-edited",
            price: 20.0,
            id: 2
        });
        expect(updatedProduct.name).toEqual("product-two-edited");
    }));
    //test getAllProducts method.
    it("Get All products method return all users.", () => __awaiter(void 0, void 0, void 0, function* () {
        const productsArray = yield productModel.getAllProducts();
        expect(productsArray.length).toBe(2);
    }));
    //test get one product method.
    it("Get One product method return specific product based on id of user.", () => __awaiter(void 0, void 0, void 0, function* () {
        const specificProduct = yield productModel.getOne(1);
        expect(specificProduct.id).toEqual(1);
        expect(specificProduct.price).toEqual(product.price);
        expect(specificProduct.name).toEqual(product.name);
    }));
    //test delete method.
    it("Delete method should return data of deleted product based on id.", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield productModel.deleteOne(1);
        expect(deletedProduct.id).toEqual(1);
        expect(deletedProduct.price).toEqual(product.price);
        expect(deletedProduct.name).toEqual(product.name);
    }));
});
