import supertest, { Response } from "supertest";
import app from "../../index";
import { token } from "./auth.spec";
import db from "../../database/dbconnection";
import orders from "../../types/orders.type";
const request = supertest(app);


describe("afterAll orders", () => {
  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users";
    const alter = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    const sqlorder = "DELETE FROM orders";
    const alterorder = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";

    await connection.query(sqlorder);
    await connection.query(alterorder);
    await connection.query(sql);
    await connection.query(alter);
    connection.release();
  });

  describe("ROUTES TO ORDERS", () => {
    it("/orders/create/order", async () => {
      const order: orders = {
        status: "active",
        user_id: 1,
      };
      const response: Response = await request
        .post("/orders/create/order")
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          status: "active",
          user_id: 1,
        });
      expect(response.status).toBe(200);
      const { status, user_id } = response.body.data;
      expect(status).toBe(order.status);
      expect(parseInt(user_id)).toBe(order.user_id);
    });
    it("/orders/show/id", async () => {
      const response: Response = await request
        .get(`/orders/show/1`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      const { status, user_id } = response.body.data;
      expect(status).toBe("active");
      expect(parseInt(user_id)).toBe(1);
    });
    it("/orders/index", async () => {
      const response: Response = await request
        .get(`/orders/index`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toEqual(1);
    });
    it("/orders/edit/", async () => {
      const response: Response = await request
        .patch(`/orders/edit`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send({
          status: "complete",
          user_id: 1,
        });
      expect(response.status).toBe(200);
      const { status, user_id } = response.body.data;
      expect(status).toBe("complete");
      expect(parseInt(user_id)).toBe(1);
    });
    it("/orders/delete/id", async () => {
      const response: Response = await request
        .delete(`/orders/delete/${1}`)
        .set("content-type", "application/json")
        .set("authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      const { status, user_id } = response.body.data;
      expect(status).toBe("complete");
      expect(parseInt(user_id)).toBe(1);
    });
  });
});
