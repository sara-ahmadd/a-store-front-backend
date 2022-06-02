import { Router, Request, Response } from "express";
import OrderModel from "../../models/orders.model";
import { authorized } from "../../middlewares/user.authorization";
const order = new OrderModel();
const orderRoute = Router();
//route to create order.
orderRoute.post(
  "/create/order",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const createdOrder = await order.create(req.body);
      res.json({ data: createdOrder });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);
//route to get orders of an authorized user by his id and token provided with the request.
orderRoute.get("/index/", authorized, async (req: Request, res: Response) => {
  try {
    const ordersArray = await order.index();
    res.json({ data: ordersArray });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
//route to edit orders of an authorized user and token is provided with the request.
orderRoute.patch("/edit", authorized, async (req: Request, res: Response) => {
  try {
    const editedOrder = await order.edit(req.body);
    res.json({ data: editedOrder });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
//route to get current order of an authorized user by his id and token provided with the request.
orderRoute.get("/show/:id", authorized, async (req: Request, res: Response) => {
  try {
    const currentOrder = await order.show(req.params.id as unknown as number);
    res.json({ data: currentOrder });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
//route to delete order of an authorized user by his id and token provided with the request.
orderRoute.delete(
  "/delete/:id",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const deletedOrder = await order.delete(
        req.params.id as unknown as number
      );
      res.json({ data: deletedOrder });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);

export default orderRoute;
