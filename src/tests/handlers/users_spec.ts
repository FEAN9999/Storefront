import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const request = supertest(app);

const userInstance = {
  id: crypto.randomUUID(),
  firstName: "Phat123",
  lastName: "Lee123",
  userName: "lee123phat",
  password: bcrypt.hashSync("123456", 10),
};

let token = jwt.sign(userInstance, process.env.TOKEN_SECRET);

describe("User Handler", () => {
  it("should return success for CREATE user", async () => {
    const response = await request.post("/users").send(userInstance);
    expect(response.status).toBe(200);
  });

  it("should return success for READ all users", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("should return success for READ user by id", async () => {
    const response = await request
      .get(`/users/${userInstance.id}`)
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
  });

  it("should return success for UPDATE user", async () => {
    const response = await request
      .put(`/users/${userInstance.id}`)
      .auth(token, { type: "bearer" })
      .send({
        firstName: userInstance.firstName,
        lastName: userInstance.lastName,
        userName: userInstance.userName,
        password: userInstance.password,
      });

    expect(response.status).toBe(200);
  });

  it("should return success for DELETE user by username", async () => {
    const response = await request
      .delete(`/users/${userInstance.id}`)
      .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
  });
});
