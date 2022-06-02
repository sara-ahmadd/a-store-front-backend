import db from "../../database/dbconnection";
import OrderModel from "../../models/orders.model";
import orders from "../../types/orders.type";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
const userModel = new UserModel();
const orderModel = new OrderModel();

//test create method in ProductModel.
describe("Test ORDER MODEL methods to be defined.", () => {
  it("test create method.", async () => {
    expect(orderModel.create).toBeDefined();
  });
  it("test get all orders method.", async () => {
    expect(orderModel.index).toBeDefined();
  });
  it("test get one order method.", async () => {
    expect(orderModel.show).toBeDefined();
  });
});
describe("Test ORDER MODEL  methods to run properly.", () => {
  beforeAll(async () => {
    const user: User = {
      email: "testEmail@email.com",
      firstname: "first",
      lastname: "last",
      password: "test123",
    };
    const result = await userModel.create(user);
    user.id = result.id;
  });
  const order: orders = {
    status: "active",
    user_id: 1,
  };
  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM orders";
    const alter = "ALTER SEQUENCE orders_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(alter);
    connection.release();
  });
  //test create method.
  it("Create method return created order", async () => {
    const createdOrder = await orderModel.create(order);
    expect(createdOrder.id).toEqual(1);
    expect(parseInt(createdOrder.user_id as unknown as string)).toEqual(
      order.user_id
    );
    expect(createdOrder.status).toEqual(order.status);
  });
  //test getAllorders method.
  it("Get All Orders method return all orders.", async () => {
    const ordersArray = await orderModel.index();
    expect(ordersArray.length).toBe(1);
  });
  //test get one product method.
  it("Get One order method return specific order based on id.", async () => {
    const specificOrder = await orderModel.show(order.user_id);
    expect(specificOrder.id).toEqual(1);
    expect(parseInt(specificOrder.user_id as unknown as string)).toEqual(
      order.user_id
    );
    expect(specificOrder.status).toEqual(order.status);
  });
});
