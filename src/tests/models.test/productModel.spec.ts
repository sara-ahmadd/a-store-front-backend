import db from "../../database/dbconnection";
import ProductModel from "../../models/product.model";
import Product from "../../types/product.type";
const productModel = new ProductModel();
//test create method in ProductModel.
describe("Test PRODUCT MODEL methods to be defined.", () => {
  it("test create method.", async () => {
    expect(productModel.createProduct).toBeDefined();
  });
  it("test update method.", async () => {
    expect(productModel.updateOne).toBeDefined();
  });
  it("test get all products method.", async () => {
    expect(productModel.getAllProducts).toBeDefined();
  });
  it("test get one product method.", async () => {
    expect(productModel.getOne).toBeDefined();
  });
  it("test delete method.", async () => {
    expect(productModel.deleteOne).toBeDefined();
  });
});
describe("Test PRODUCT MODEL  methods to run properly.", () => {
  const product: Product = {
    name: "product-one",
    price: 20.0,
  };
  const secProduct: Product = {
    name: "product-two",
    price: 20.0,
  };
  beforeAll(async () => {
    await productModel.createProduct(product);
  });
  afterAll(async () => {
    const connection = await db.connect();
    const sql = "DELETE FROM products";
    const alter = "ALTER SEQUENCE products_id_seq RESTART WITH 1";
    await connection.query(sql);
    await connection.query(alter);
    connection.release();
  });
  //test create method.
  it("Create method return created product", async () => {
    const createdProduct = await productModel.createProduct(secProduct);
    expect(createdProduct.id).toEqual(2);
    expect(createdProduct.name).toEqual(secProduct.name);
    expect(createdProduct.price).toEqual(secProduct.price);
  });
  //test update method.
  it("Update method return updated user.", async () => {
    const updatedProduct = await productModel.updateOne({
      name: "product-two-edited",
      price: 20.0,
      id:2
    });
    expect(updatedProduct.name).toEqual("product-two-edited");
  });
  //test getAllProducts method.
  it("Get All products method return all users.", async () => {
    const productsArray = await productModel.getAllProducts();
    expect(productsArray.length).toBe(2);
  });
  //test get one product method.
  it("Get One product method return specific product based on id of user.", async () => {
    const specificProduct = await productModel.getOne(1);
    expect(specificProduct.id).toEqual(1);
    expect(specificProduct.price).toEqual(product.price);
    expect(specificProduct.name).toEqual(product.name);
  });

  //test delete method.
  it("Delete method should return data of deleted product based on id.", async () => {
    const deletedProduct = await productModel.deleteOne(1);
    expect(deletedProduct.id).toEqual(1);
    expect(deletedProduct.price).toEqual(product.price);
    expect(deletedProduct.name).toEqual(product.name);
  });
});
