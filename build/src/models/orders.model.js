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
class Order {
    constructor() {
        //create new order.
        this.create = (order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING id,status,user_id`;
                const result = yield connection.query(sql, [order.status, order.user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw Error("This User not allowed to create new order");
            }
        });
        //get all Completed Orders.
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT * FROM orders`;
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (err) {
                throw Error("This User not allowed to get all orders.");
            }
        });
        //get Current Order by user (args: user id)
        this.show = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `SELECT id,user_id,status FROM orders WHERE user_id=($1)`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw Error("This User not allowed to get this order.");
            }
        });
        //update an Order by user.
        this.edit = (order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `UPDATE orders SET status=$1 WHERE user_id=($2) RETURNING *`;
                const result = yield connection.query(sql, [order.status, order.user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw Error("This User not allowed to update this order.");
            }
        });
        //delete Current Order by user id.
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield dbconnection_1.default.connect();
                const sql = `DELETE FROM orders WHERE user_id=$1 RETURNING *`;
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw Error("This User not allowed to delete this order.");
            }
        });
    }
}
exports.default = Order;
