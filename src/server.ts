import express, { Request, Response } from "express";
import productsRoute from "./handlers/products";
import usersRoute from "./handlers/users";
import orderRoute from "./handlers/orders";
const cors = require("cors");
const app: express.Application = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json()); // Add this line to parse request bodies as JSON
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(PORT, function () {
  console.log(`starting app on: ${PORT}`);
});

productsRoute(app); // Add this line to register the products route
usersRoute(app); // Add this line to register the users route
orderRoute(app); // Add this line to register the orders route

export default app;
