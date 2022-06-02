import express, { Router, Request, Response } from "express";
import { authorized } from "../../middlewares/user.authorization";
import orderProducts from "../../models/order_products.model";
import OrderProducts from "../../types/order_products";
const order = new orderProducts();
const orderproductRoute = Router();
orderproductRoute.use(express.json());
orderproductRoute.post(
  "/orders-products/:id/products",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const addedProduct = {
        quantity: req.body.quantity as number,
        Order_id: req.params.id as unknown as number,
        Product_id: req.body.product_id as number,
      };
      const newaddedProduct = await order.addProduct(addedProduct);
      res.json({ data: newaddedProduct });
    } catch (err) {
      throw new Error("error in getting required data");
    }
  }
);
//route to edit products in an an order.
orderproductRoute.patch(
  "/orders-products/:id/products/edit",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const updatedProduct: OrderProducts = {
        quantity: req.body.quantity as number,
        Order_id: req.params.id as unknown as number,
        Product_id: req.body.product_id as number,
      };
      const newProduct = await order.updateProducts(updatedProduct);
      res.json({ data: newProduct });
    } catch (err) {
      throw new Error(`404 user error:${err}`);
    }
  }
);
//route to get all products in an order.
orderproductRoute.get(
  "/orders-products/:id/products/show",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const returnedOrder = await order.getOrderProducts(
        req.params.id as unknown as number
      );
      res.json({ data: returnedOrder });
    } catch (err) {
      throw new Error(`cannot process your request :${err}`);
    }
  }
);
export default orderproductRoute;
