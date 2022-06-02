import Product from "../types/product.type";
import db from "../database/dbconnection";

class ProductModel {
  //create new product
  async createProduct(product: Product): Promise<Product> {
    try {
      //connect to database.
      const connection = await db.connect();
      //create the sql query.
      const sql = `INSERT INTO products (name,price) VALUES ($1,$2)
      RETURNING id,name,price`;
      const result = await connection.query(sql, [product.name, product.price]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error("cannot create new product");
    }
  }
  //func to get all Products.
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id,name,price
    FROM products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error("cannot get all products");
    }
  }
  //func to update Product.
  async updateOne(p: Product): Promise<Product> {
    try {
      //connect to DB.
      const connection = await db.connect();
      const sql = `UPDATE products SET name=$1,price=$2 WHERE id=($3)RETURNING id,name,price`;
      //send request(query).
      const result = await connection.query(sql, [p.name, p.price, p.id]);
      //release connection with DB.
      connection.release();
      //return the response.
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot update that product : productId ${p.id}`);
    }
  }
  //func to get a Product.
  async getOne(id: number): Promise<Product> {
    try {
      //connect to db.
      const connection = await db.connect();
      //send query.
      const sql = `SELECT id,name,price FROM products
    WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      //return the result.
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot update that product : productId ${id}`);
    }
  }
  //func to delete Product.
  async deleteOne(id: number): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM products WHERE
    id=($1)RETURNING id,name,price`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot delete that product : productId ${id}`);
    }
  }
}
export default ProductModel;
