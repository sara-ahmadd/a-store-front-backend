import { Router } from "express";
import productRoute from "./api/product.routes";
import userRoute from "./api/user.routes";
import orderRoute from "./api/order.routes";
import orderproductRoute from "./api/order_products.routes";
const routes = Router();
routes.use("/cart", orderproductRoute);
routes.use("/users", userRoute);
routes.use("/products", productRoute);
routes.use("/orders", orderRoute);

export default routes;
