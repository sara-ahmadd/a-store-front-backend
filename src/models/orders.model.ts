import db from "../database/dbconnection";
import Orders from "../types/orders.type";

class Order {
  //create new order.
  create = async (order: Orders): Promise<Orders> => {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING id,status,user_id`;
      const result = await connection.query(sql, [order.status, order.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw Error("This User not allowed to create new order");
    }
  };
  //get all Completed Orders.
  index = async (): Promise<Orders[]> => {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM orders`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw Error("This User not allowed to get all orders.");
    }
  };
  //get Current Order by user (args: user id)
  show = async (id: number): Promise<Orders> => {
    try {
      const connection = await db.connect();
      const sql = `SELECT id,user_id,status FROM orders WHERE user_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw Error("This User not allowed to get this order.");
    }
  };
  //update an Order by user.
  edit = async (order: Orders): Promise<Orders> => {
    try {
      const connection = await db.connect();
      const sql = `UPDATE orders SET status=$1 WHERE user_id=($2) RETURNING *`;
      const result = await connection.query(sql, [order.status, order.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw Error("This User not allowed to update this order.");
    }
  };
  //delete Current Order by user id.
  delete = async (id: number): Promise<Orders> => {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM orders WHERE user_id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw Error("This User not allowed to delete this order.");
    }
  };
}

export default Order;
