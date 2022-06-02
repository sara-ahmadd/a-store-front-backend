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
const dbconnection_1 = __importDefault(require("../database/dbconnection"));
class ProductModel {
    //create new product
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to database.
                const connection = yield dbconnection_1.default.connect();
                //create the sql query.
                const sql = `INSERT INTO products (name,price) VALUES ($1,$2)
      RETURNING id,name,price`;
                const result = yield connection.query(sql, [product.name, product.price]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error("cannot create new product");
            }
        });
    }
    //func to get all Products.
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT id,name,price
    FROM products`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw new Error("cannot get all products");
            }
        });
    }
    //func to update Product.
    updateOne(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to DB.
                const connection = yield dbconnection_1.default.connect();
                const sql = `UPDATE products SET name=$1,price=$2 WHERE id=($3)RETURNING id,name,price`;
                //send request(query).
                const result = yield connection.query(sql, [p.name, p.price, p.id]);
                //release connection with DB.
                connection.release();
                //return the response.
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot update that product : productId ${p.id}`);
            }
        });
    }
    //func to get a Product.
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //connect to db.
                const connection = yield dbconnection_1.default.connect();
                //send query.
                const sql = `SELECT id,name,price FROM products
    WHERE id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                //return the result.
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot update that product : productId ${id}`);
            }
        });
    }
    //func to delete Product.
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `DELETE FROM products WHERE
    id=($1)RETURNING id,name,price`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot delete that product : productId ${id}`);
            }
        });
    }
}
exports.default = ProductModel;
