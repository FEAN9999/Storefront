import express, { Request, Response } from "express";
import actionUser from "../models/users";
import { verifyAuthToken } from "../middleware/middleware";
import { createToken } from "../utils/auth";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const usersRoute = (app: express.Application) => {
  app.get("/users", verifyAuthToken, indexUsers);
  app.get("/users/:id", verifyAuthToken, showUser);
  app.post("/users", addUser);
  app.put("/users/:id", verifyAuthToken, deleteUser);
  app.delete("/users/:id", verifyAuthToken, updateUser);
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const data = await actionUser.indexUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const data = await actionUser.showUser(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addUser = async (req: Request, res: Response) => {
  const { firstName, lastName, userName, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = { firstName, lastName, userName, password: hashPassword };
    let token = createToken(newUser);
    const data = await actionUser.addUser(newUser);
    res.json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await actionUser.deleteUser(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const data = await actionUser.updateUser(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default usersRoute;
