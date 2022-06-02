import OrderProducts from "../types/order_products";
import db from "../database/dbconnection";
class orderProducts {
  //adding products to an order(creating a cart functionality).
  addProduct = async (order: OrderProducts): Promise<OrderProducts> => {
    try {
      const connection = await db.connect();
      const sql = `INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
      const result = await connection.query(sql, [
        order.quantity,
        order.Order_id,
        order.Product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Product with the id :${order.Product_id} cannot be ADDED to this order with the id :${order.Order_id} `
      );
    }
  };
  //edit products in an order.
  updateProducts = async (order: OrderProducts): Promise<OrderProducts> => {
    try {
      const connection = await db.connect();
      const sql = `UPDATE order_products SET quantity=$1,order_id=$2,product_id=$3 RETURNING *`;
      const result = await connection.query(sql, [
        order.quantity,
        order.Order_id,
        order.Product_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Product with the id :${order.Product_id} cannot be UPDATED in the order with the id :${order.Order_id} `
      );
    }
  };
  //get products in an order.
  getOrderProducts = async (id: number): Promise<OrderProducts> => {
    try {
      const connection = await db.connect();
      const sql = `SELECT * FROM order_products WHERE order_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get products in the order with id=>${id}`);
    }
  };
}
export default orderProducts;
