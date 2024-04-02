import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json("Access denied, invalid token");
  }
};

export { verifyAuthToken };
