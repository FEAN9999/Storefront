import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IkxlZSIsImxhc3ROYW1lIjoiUGhhdCAyIiwidXNlck5hbWUiOiJsYW5jZSIsInBhc3N3b3JkIjoiJDJiJDEwJHhHdWlmWEhIMXdMenpMODdqb2FpOE8wOGdLL3dXSmNFWlpMSDhxTHJQQ0pjamc0ZWNUb0EyIn0sImlhdCI6MTcxMjExODk0NH0.UHJlFOA_gSLa597ztc0f0UcITxFhef2Yp2mTIR6ZMbU";

const request = supertest(app);

const productInstance = {
  id: crypto.randomUUID(),
  name: "product9",
  price: 9,
};

describe("Product Handler", () => {
  it("should return success for CREATE product", async () => {
    const response = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send(productInstance);

    expect(response.status).toBe(200);
  });

  it("should return success for READ all products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("should return success for READ product by id", async () => {
    const response = await request.get(`/products/${productInstance.id}`);

    expect(response.status).toBe(200);
  });

  it("should return success for UPDATE product by id", async () => {
    const response = await request
      .put(`/products/${productInstance.id}`)
      .auth(token, { type: "bearer" })
      .send({ name: productInstance.name, price: productInstance.price });

    expect(response.status).toBe(200);
  });

  it("should return success for DELETE product by id", async () => {
    const response = await request
      .delete(`/products/${productInstance.id}`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
