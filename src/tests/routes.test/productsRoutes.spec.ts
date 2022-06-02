import supertest, { Response } from "supertest";
import app from "../../index";
import { token } from "./auth.spec";
import Product from "../../types/product.type";
import db from "../../database/dbconnection";


const request = supertest(app);

const newProduct: Product = {
  name: "product-one",
  price: 20,
};

describe("test route to /products/", () => {
  afterAll(async () => {
    const connection = await db.connect();
    const sqlproduct = "DELETE FROM products";
    const alterorder = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
   
    await connection.query(sqlproduct);
    await connection.query(alterorder);
    connection.release();
  });

  describe("ROUTES TO PRODUCTS", () => {
    it("create product", async () => {
      const res: Response = await request
        .post("/products/create/product")
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "product-one",
          price: 20,
        });
      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toEqual(newProduct.name);
      expect(price).toEqual(newProduct.price);
    });
    it("get product", async () => {
      const res: Response = await request
        .get(`/products/show/${1}`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toEqual(newProduct.name);
      expect(price).toEqual(newProduct.price);
    });
    it("get all products", async () => {
      const res: Response = await request
        .get(`/products/index`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toEqual(1);
    });
    it("edit products", async () => {
      const res: Response = await request
        .patch(`/products/edit`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "product-one-edited",
          price: 20,
          id: 1,
        });
      expect(res.status).toBe(200);
      const { name, price } = res.body.data;
      expect(name).toEqual("product-one-edited");
      expect(price).toEqual(newProduct.price);
    });
    it("delete products", async () => {
      const res: Response = await request
        .delete(`/products/delete/${1}`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "product-one-edited",
          price: 20,
        });
      expect(res.status).toBe(200);
      const { name, price, id } = res.body.data;
      expect(name).toEqual("product-one-edited");
      expect(price).toEqual(newProduct.price);
      expect(id).toEqual(1);
    });
  });
});
