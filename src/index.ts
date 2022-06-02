import express, { NextFunction } from "express";
import config from "../dotenv.config";
import morgan from "morgan";
import helmet from "helmet";
import ratelimit from "express-rate-limit";
import routes from "./routes/routes";
import path from "path";

//create a rate limiting object.
const rate = {
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // Limit each IP to 2 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "too many requests from this ip , try again later",
};

//create an instance app.
const app: express.Application = express();

//using ratelimit middleware.
app.use(ratelimit(rate));
app.use(express.json());
//using morgan : http logger middlware.
app.use(morgan("common"));
//using helmet : http security middleware.
app.use(helmet());
//create simple api to the app homepage.
app.use("/", routes);
//custom middleware handle requesting unavailable route.
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({
//     message: "This Route Doesnot Exist!!",
//   });
// });
app.use(express.static(path.join(__dirname, "statics")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "statics/index.html"));
});
//using a custom middleware to handdle global errors.
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const message =
      error.message ||
      "Somthing Wronge Happened While Processing Your Request!!!";
    res.status(400).json(message);
    next();
  }
);

const port = config.port;
//create a local server.
app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
export default app;
