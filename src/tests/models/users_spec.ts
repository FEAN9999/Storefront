import dotenv from "dotenv";
import actionUser from "../../models/users";
import { Users } from "../../common/interface";
import { createToken } from "../../utils/auth";

const bcrypt = require("bcrypt");
dotenv.config();

const dummyUser: Users = {
  id: "",
  firstName: "Phat",
  lastName: "Lee",
  userName: "phatlee",
  password: bcrypt.hashSync("123456", 10),
};

const dummyData = {
  password: "123456",
  user_id: "",
};

describe("User Model", () => {
  it("should have an INDEX method", () => {
    expect(actionUser.indexUsers).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(actionUser.showUser).toBeDefined();
  });

  it("should have a UPDATE method", () => {
    expect(actionUser.updateUser).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(actionUser.addUser).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(actionUser.deleteUser).toBeDefined();
  });

  it("CREATE method should add a user", async () => {
    const { id, first_name, last_name, user_name, password } =
      await actionUser.addUser(dummyUser);

    dummyUser.id = id;
    expect({ id, first_name, last_name, user_name, password }).toEqual({
      id: dummyUser.id,
      first_name: dummyUser.firstName,
      last_name: dummyUser.lastName,
      user_name: dummyUser.userName,
      password: dummyUser.password,
    });
  });

  it("INDEX method should return a list of users", async () => {
    const userList = await actionUser.indexUsers();
    const { id, first_name, last_name, user_name, password } = userList[0];
    expect([{ id, first_name, last_name, user_name, password }]).toBeDefined();
  });

  it("SHOW method should return a user by id", async () => {
    const { id, first_name, last_name, user_name, password } =
      await actionUser.showUser(dummyUser.id || "");
    expect({ id, first_name, last_name, user_name, password }).toEqual({
      id: dummyUser.id,
      first_name: dummyUser.firstName,
      last_name: dummyUser.lastName,
      user_name: dummyUser.userName,
      password: dummyUser.password,
    });
  });

  it("UPDATE method should return a user updated by id", async () => {
    const { id, first_name, last_name, user_name, password } =
      await actionUser.updateUser(dummyUser.id || "", {
        firstName: dummyUser.firstName,
        lastName: dummyUser.lastName,
        userName: dummyUser.userName,
        password: dummyUser.password,
      });

    expect({
      id: id,
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      password: password,
    }).toEqual({
      id: dummyUser.id,
      first_name: dummyUser.firstName,
      last_name: dummyUser.lastName,
      user_name: dummyUser.userName,
      password: dummyUser.password,
    });
  });

  it("DELETE method should delete a user by id", async () => {
    await actionUser.deleteUser(dummyUser.id || "");
    const result = await actionUser.showUser(dummyUser.id || "");
    expect(result).toBe(undefined);
  });
});
