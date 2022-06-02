import supertest, { Response } from "supertest";
import app from "../../index";
import { token } from "./auth.spec";
import db from "../../database/dbconnection";
import orderProduct from "../../types/order_products";
import order from "../../types/orders.type";
import Product from "../../types/product.type";
import orderProducts from "../../models/order_products.model";
import products from "../../models/product.model";
import orders from "../../models/orders.model";

const product1 = new products();
const createOrder = new orders();
const orderProduct = new orderProducts();

const request = supertest(app);

const newProd: Product = {
  name: "product",
  price: 40,
};
const order1: order = {
  status: "active",
  user_id: 1,
};

describe("afterAll ORDER_PRODUCTS", () => {
  beforeAll(async () => {
    await product1.createProduct(newProd);
    await createOrder.create(order1);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders";
    const alter = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
    const sqlproduct = "DELETE FROM products";
    const alterproduct = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    const sqlorder = "DELETE FROM order_products";
    const alterorder = "ALTER SEQUENCE order_products_id_seq RESTART WITH 1";

    await connection.query(sqlorder);
    await connection.query(alterorder);
    await connection.query(sql);
    await connection.query(alter);
    await connection.query(sqlproduct);
    await connection.query(alterproduct);
    connection.release();
  });

  describe("ROUTES TO ORDER_PRODUCTS", () => {
    it("creat products in an order(/cart/orders-products/:id/products)", async () => {
      const orderP: orderProduct = {
        quantity: 70,
        Order_id: 1,
        Product_id: 1,
      };
      const response: Response = await request
        .post("/cart/orders-products/1/products")
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          quantity: 70,
          Product_id: 1,
        });
      expect(response.status).toBe(200);
      const { quantity, id } = response.body.data;
      expect(quantity).toBe(orderP.quantity);
      expect(parseInt(id)).toBe(1);
    });
    it("/cart/orders-products/1/products/show", async () => {
      const response: Response = await request
        .get(`/cart/orders-products/1/products/show`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      const { quantity, id } = response.body.data;
      expect(quantity).toBe(70);
      expect(parseInt(id)).toBe(1);
    });
    it("/cart/orders-products/1/products/edit", async () => {
      const response: Response = await request
        .patch(`/cart/orders-products/1/products/edit`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          quantity: 900,
          Product_id: 1,
        });
      expect(response.status).toBe(200);
      const { quantity, id } = response.body.data;
      expect(quantity).toBe(900);
      expect(parseInt(id)).toBe(1);
    });
  });
});
