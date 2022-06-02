import db from "../../database/dbconnection";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
const userModel = new UserModel();
//test create method in usermodel.
describe("Test USER MODEL methods to be defined.", () => {
  it("test create method.", async () => {
    expect(userModel.create).toBeDefined();
  });
  it("test update method.", async () => {
    expect(userModel.updateOne).toBeDefined();
  });
  it("test get all users method.", async () => {
    expect(userModel.getAllUsers).toBeDefined();
  });
  it("test get one user method.", async () => {
    expect(userModel.getOne).toBeDefined();
  });
  it("test delete method.", async () => {
    expect(userModel.deleteOne).toBeDefined();
  });
});
describe("Test USER MODEL methods to run properly.", () => {
  const user: User = {
    email: "testEmail2@email.com",
    firstname: "first",
    lastname: "last",
    password: "test123",
  };
  const secondUser: User = {
    email: "testEmail3@email.com",
    firstname: "first",
    lastname: "last",
    password: "test123",
  };
  beforeAll(async () => {
    await userModel.create(user);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sqlUser = "DELETE FROM users";
    const alterUser = "ALTER SEQUENCE users_id_seq RESTART WITH 1";
    await connection.query(sqlUser);
    await connection.query(alterUser);
    connection.release();
  });
  //test create method.
  it("Create method return created user", async () => {
    const createdUser = await userModel.create(secondUser);
    expect(createdUser.id).toEqual(3);
    expect(createdUser.email).toEqual(secondUser.email);
    expect(createdUser.firstname).toEqual(secondUser.firstname);
    expect(createdUser.lastname).toEqual(secondUser.lastname);
  });
  //test update method.
  it("Update method return updated user.", async () => {
    const updatedUser = await userModel.updateOne({
      ...secondUser,
      firstname: "updated-first-name",
      id:3
    });
    expect(updatedUser?.firstname).toEqual("updated-first-name");
  });
  //test getAllUsers method.
  it("Get All Users method return all users.", async () => {
    const usersArray = await userModel.getAllUsers();
    expect(usersArray.length).toBe(3);
  });
  //test get one user method.
  it("Get One User method return specific user based on id.", async () => {
    const specificUser = await userModel.getOne(2);
    expect(specificUser.email).toEqual(user.email);
    expect(specificUser.firstname).toEqual(user.firstname);
    expect(specificUser.lastname).toEqual(user.lastname);
  });

  it("Authenticate method return authenticated user", async () => {
    const authUser = await userModel.authenticate(
      "testEmail2@email.com",
      "test123"
    );
    expect(authUser?.id).toEqual(2);
    expect(authUser?.email).toEqual(user.email);
    expect(authUser?.firstname).toEqual(user.firstname);
    expect(authUser?.lastname).toEqual(user.lastname);
  });
  it("Authenticate method return null with unvalid user.", async () => {
    const authUser = await userModel.authenticate("fake@email", "fakePassword");
    expect(authUser).toBeNull();
  });
  //test delete method.
  it("Delete method should return data of deleted user based on id.", async () => {
    const deletedUser = await userModel.deleteOne(2);
    expect(deletedUser.email).toEqual(user.email);
    expect(deletedUser.firstname).toEqual(user.firstname);
    expect(deletedUser.lastname).toEqual(user.lastname);
  });
});
