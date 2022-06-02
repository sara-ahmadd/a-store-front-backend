import { Router, Request, Response } from "express";
import UserModel from "../../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../../dotenv.config";
import { authorized } from "../../middlewares/user.authorization";

const user = new UserModel();
const userRoute = Router();
//catch (err) {
//throw new Error(`cannot process your request:${err}`);
//}
userRoute.post("/create", async (req: Request, res: Response) => {
  try {
    const newUser = await user.create(req.body);
    res.json({ data: newUser });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
//use authorization middleware to send jsonwebtoken with get request to retrieve data of all users.
userRoute.get("/index", authorized, async (req: Request, res: Response) => {
  try {
    const indexUsers = await user.getAllUsers();
    res.json({ data: indexUsers });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});

//use authorization middleware to send jsonwebtoken with get request to retrieve data of a specific user.
userRoute.get("/show/:id", authorized, async (req: Request, res: Response) => {
  try {
    const showUser = await user.getOne(req.params.id as unknown as number);
    res.json({ data: showUser });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});
//use authorization middleware to send jsonwebtoken with get request to update data of specific user.
userRoute.patch("/edit", authorized, async (req: Request, res: Response) => {
  try {
    const editedUser = await user.updateOne(req.body);
    res.json({ data: editedUser });
  } catch (err) {
    throw new Error(`cannot process your request:${err}`);
  }
});

//use authorization middleware to send jsonwebtoken with get request to delete data of specific user.
userRoute.delete(
  "/delete/:id",
  authorized,
  async (req: Request, res: Response) => {
    try {
      const deletedUser = await user.deleteOne(
        req.params.id as unknown as number
      );
      res.json({ data: deletedUser });
    } catch (err) {
      throw new Error(`cannot process your request:${err}`);
    }
  }
);

userRoute.post("/authenticate", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authenticateUser = await user.authenticate(email, password);
    const jwtToken = jwt.sign(
      { authenticateUser },
      config.webtoken as unknown as string
    );
    if (!authenticateUser) {
      res.status(404).json({
        status: "failed",
        message: "The User With This Email & Password Is Unvalid",
      });
    } else {
      res.json({
        status: "success",
        message: "User Data Is Authenticated and Authorized",
        data: { ...authenticateUser, jwtToken },
      });
    }
  } catch (error) {
    throw new Error(
      "An Error Happened On Authenticating Your Password or Email"
    );
  }
});
export default userRoute;
