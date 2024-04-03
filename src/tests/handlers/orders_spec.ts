import supertest from "supertest";
import express from "express";
import dotenv from "dotenv";
import app from "../../server";
import actionUser from "../../models/users";
import actionProduct from "../../models/products";
const bcrypt = require("bcrypt");

dotenv.config();

const request = supertest(app);
app.use(express.json()); // Add this line to parse request bodies as JSON

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IkxlZSIsImxhc3ROYW1lIjoiUGhhdCAyIiwidXNlck5hbWUiOiJsYW5jZSIsInBhc3N3b3JkIjoiJDJiJDEwJHhHdWlmWEhIMXdMenpMODdqb2FpOE8wOGdLL3dXSmNFWlpMSDhxTHJQQ0pjamc0ZWNUb0EyIn0sImlhdCI6MTcxMjExODk0NH0.UHJlFOA_gSLa597ztc0f0UcITxFhef2Yp2mTIR6ZMbU";

let dummyData = {
  user_id: "",
  product_id: "",
  order_id: "",
  order_product_id: "",
};

describe("Order Handler", () => {
  beforeAll(async () => {
    const hashPassword = bcrypt.hashSync("123456", 10);
    const user = await actionUser.addUser({
      firstName: "Phat",
      lastName: "Nguyen",
      userName: "phatlee123",
      password: hashPassword,
    });

    dummyData.user_id = user.id;
    const product = await actionProduct.addProduct({
      name: "product1",
      price: 1000,
    });
    dummyData.product_id = product.id;
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders")
      .auth(token, { type: "bearer" })
      .send({ status: "active", user_id: dummyData.user_id });
    dummyData.order_id = response.body.id;
    expect(response.status).toBe(200);
  });

  it("should return success for READ all orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
  });

  it("should return success for READ orders by user id", async () => {
    const response = await request.get(`/orders/${dummyData.user_id}`);
    expect(response.status).toBe(200);
  });

  it("should return success for CREATE order", async () => {
    const response = await request
      .post("/orders/product")
      .auth(token, { type: "bearer" })
      .send({
        quantity: 10,
        order_id: dummyData.order_id,
        product_id: dummyData.product_id,
      });

    expect(response.status).toBe(200);
  });

  it("should return success for CREATE order product ", async () => {
    const response = await request
      .post("/orders/product")
      .auth(token, { type: "bearer" })
      .send({
        quantity: 10,
        order_id: dummyData.order_id,
        product_id: dummyData.product_id,
      });

    expect(response.status).toBe(200);
  });

  it("should return success for DELETE order by order id", async () => {
    const response = await request
      .delete(`/orders/${dummyData.order_id}`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("should return success for DELETE order product with order product id", async () => {
    const response = await request
      .delete(`/orders/product/${dummyData.order_product_id}`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  //   afterAll(async () => {
  //     await actionUser.deleteUser(dummyData.user_id);
  //     await actionProduct.deleteProduct(dummyData.product_id);
  //   });
});
