import { Router, Request, Response } from "express";
import ProductModel from "../../models/product.model";
import { authorized } from "../../middlewares/user.authorization";

const product = new ProductModel();
const productRoute = Router();

productRoute.post(
  "/create/product",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const newProduct = await product.createProduct(req.body);
      res.json({ data: newProduct });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);
productRoute.get("/index", authorized, async (req: Request, res: Response) => {
  try {
    const productsArray = await product.getAllProducts();
    res.json({ data: productsArray });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
productRoute.get(
  "/show/:id",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const showProduct = await product.getOne(
        req.params.id as unknown as number
      );
      res.json({ data: showProduct });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);
productRoute.patch("/edit", authorized, async (req: Request, res: Response) => {
  try {
    const editedProduct = await product.updateOne(req.body);
    res.json({ data: editedProduct });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
productRoute.delete(
  "/delete/:id",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const deletedProduct = await product.deleteOne(
        req.params.id as unknown as number
      );
      res.json({ data: deletedProduct });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);
export default productRoute;
