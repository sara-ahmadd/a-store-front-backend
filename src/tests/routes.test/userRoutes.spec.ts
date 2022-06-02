import db from "../../database/dbconnection";
import User from "../../types/user.type";
import supertest, { Response } from "supertest";
import { token } from "./auth.spec";
import app from "../../index";

const request = supertest(app);
describe("TEST USER ROUTES", () => {
  const user: User = {
    email: "testEmail2@email.com",
    firstname: "first2",
    lastname: "last2",
    password: "test123",
  };

  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM users";
    const alter = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(alter);
    connection.release();
  });
  describe("TEST CRUD API ROUTES.", () => {
    it("test creation route.", async () => {
      const res: Response = await request
        .post("/users/create")
        .set("content-type", "application/json")
        .send({
          ...user,
        });
      const { email, firstname, lastname } = res.body.data;
      expect(res.status).toBe(200);
      expect(email).toBe(user.email);
      expect(firstname).toBe(user.firstname);
      expect(lastname).toBe(user.lastname);
    });
    it("test update route", async () => {
      const res = await request
        .patch(`/users/edit`)
        .set("content-type", "Application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstname: "first2Update",
          email: "testEmail2@email.com",
          lastname: "last2",
          id: 1,
        });
      const { firstname } = res.body.data;
      expect(res.status).toBe(200);
      expect(firstname).toBe("first2Update");
    });
    it("test getAllUsers route.", async () => {
      const res = await request
        .get("/users/index")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
    it("test get one User route.", async () => {
      const res = await request
        .get(`/users/show/1`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      const { email, firstname, lastname } = res.body.data;
      expect(email).toBe(user.email);
      expect(firstname).toBe("first2Update");
      expect(lastname).toBe(user.lastname);
    });
    it("test delete one User route.", async () => {
      const res = await request
        .delete(`/users/delete/1`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      const { email, firstname, lastname } = res.body.data;
      expect(res.status).toBe(200);
      expect(email).toBe(user.email);
      expect(firstname).toBe("first2Update");
      expect(lastname).toBe(user.lastname);
    });
  });
});
