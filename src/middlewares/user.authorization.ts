import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../dotenv.config";
//a function to use the returned token to the client with requests sent by the client.
const authorized = (req: Request, _res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const bearer = authorizationHeader.split(" ")[0].toLowerCase();
    const token = authorizationHeader.split(" ")[1];
    if (bearer === "bearer" && token) {
      const decodeToken = jwt.verify(
        token,
        config.webtoken as unknown as string
      );
      if (decodeToken) {
        next();
      } else {
        throw new Error("the user isnot verified");
      }
    } else {
      throw new Error("the user isnot verified");
    }
  } else {
    throw new Error("the user isnot verified");
  }
};
export { authorized };
