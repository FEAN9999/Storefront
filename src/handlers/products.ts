import express, { Request, Response } from "express";
import actionProduct from "../models/products";
import { verifyAuthToken } from "../middleware/middleware";
const jwt = require("jsonwebtoken");

const productsRoute = (app: express.Application) => {
  app.get("/products", indexProducts);
  app.get("/products/:id", showProduct);
  app.post("/products", verifyAuthToken, addProduct);
  app.put("/products/:id", verifyAuthToken, updateProduct);
  app.delete("/products/:id", verifyAuthToken, deleteProduct);
};

const indexProducts = async (req: Request, res: Response) => {
  try {
    const data = await actionProduct.indexProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionProduct.showProduct(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(401).json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionProduct.addProduct(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionProduct.deleteProduct(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionProduct.updateProduct(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default productsRoute;
