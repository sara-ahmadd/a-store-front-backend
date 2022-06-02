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
class orderProducts {
    constructor() {
        //adding products to an order(creating a cart functionality).
        this.addProduct = (order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
                const result = yield connection.query(sql, [
                    order.quantity,
                    order.Order_id,
                    order.Product_id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Product with the id :${order.Product_id} cannot be ADDED to this order with the id :${order.Order_id} `);
            }
        });
        //edit products in an order.
        this.updateProducts = (order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `UPDATE order_products SET quantity=$1,order_id=$2,product_id=$3 RETURNING *`;
                const result = yield connection.query(sql, [
                    order.quantity,
                    order.Order_id,
                    order.Product_id,
                ]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Product with the id :${order.Product_id} cannot be UPDATED in the order with the id :${order.Order_id} `);
            }
        });
        //get products in an order.
        this.getOrderProducts = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT * FROM order_products WHERE order_id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`cannot get products in the order with id=>${id}`);
            }
        });
    }
}
exports.default = orderProducts;
