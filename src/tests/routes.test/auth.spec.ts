import supertest, { Response } from "supertest";
import app from "../../index";

import User from "../../types/user.type";
import UserModel from "../../models/user.model";

const userModel = new UserModel();

const request = supertest(app);
let token = "";
const user: User = {
  email: "testEmail@email.com",
  firstname: "first",
  lastname: "last",
  password: "test123",
};
describe("authentication", () => {
  beforeAll(async () => {
    const userId = await userModel.create(user);
    user.id = userId.id;
  });
  it("Authenticate to get token", async () => {
    const res: Response = await request
      .post("/users/authenticate")
      .set("content-type", "application/json")
      .send({
        email: "testEmail@email.com",
        password: "test123",
      });
    const { email, jwtToken } = res.body.data;
    expect(res.status).toBe(200);
    expect(email).toEqual(user.email);
    token = jwtToken;
  });
});

export { token };
