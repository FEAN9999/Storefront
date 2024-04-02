import express, { Request, Response } from "express";
import { verifyAuthToken } from "../middleware/middleware";
import actionOrder from "../models/orders";

const orderRoute = (app: express.Application) => {
  app.get("/orders", indexOrders);
  app.get("/orders/product", indexOrderProduct);
  app.get("/orders/user/:userId", verifyAuthToken, indexOrderByUserId);
  app.get("/orders/:id", showOrder);

  app.post("/orders/product", verifyAuthToken, addOrderProduct);
  app.post("/orders", verifyAuthToken, addOrder);

  app.put("/orders/:id", verifyAuthToken, updateOrder);
  app.put("/orders/product/:id", verifyAuthToken, updateOrderProduct);

  app.delete("/orders/:id", verifyAuthToken, deleteOrder);
  app.delete("/orders/product/:id", verifyAuthToken, deleteOrderProduct);
};

const indexOrders = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.indexOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const showOrder = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.showOrder(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(401).json(err);
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.addOrder(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.deleteOrder(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.updateOrder(req.params.id, req.body);
  } catch (err) {
    res.status(500).json(err);
  }
};

const indexOrderByUserId = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.currentOrderByUserId(req.params.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const indexOrderProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.indexOrderProduct();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addOrderProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.addOrderProduct(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.deleteOrderProduct(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const data = await actionOrder.updateOrderProduct(
      req.params.id,
      req.body.quantity
    );
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default orderRoute;
