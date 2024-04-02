import dotenv from "dotenv";
import actionUser from "../users";
import { Users } from "../../common/interface";
import { createToken } from "../../utils/auth";

const bcrypt = require("bcrypt");
dotenv.config();

const dummyUser: Users = {
  id: crypto.randomUUID(),
  firstName: "Phat",
  lastName: "Lee",
  userName: "phatlee",
  password: "123456",
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
    const hashPassword = bcrypt.hashSync(dummyUser.password, 10);
    const user: Users = {
      ...dummyUser,
      password: hashPassword,
    };
    const dummyToken = createToken(user);
    const token = await actionUser.addUser(user);

    expect({ token }).toEqual({
      token: dummyToken,
    });
  });

  it("INDEX method should return a list of users", async () => {
    const userList = await actionUser.indexUsers();
    const { first_name, last_name, user_name, password } = userList[0];
    const hashPassword = bcrypt.hashSync(dummyUser.password, 10);

    expect([{ first_name, last_name, user_name, password }]).toEqual([
      {
        first_name: dummyUser.firstName,
        last_name: dummyUser.lastName,
        user_name: dummyUser.userName,
        password: hashPassword,
      },
    ]);
  });

  it("SHOW method should return a user by id", async () => {
    const { first_name, last_name, user_name, password } =
      await actionUser.showUser(dummyUser.id || "");
    const hashPassword = bcrypt.hashSync(dummyUser.password, 10);
    expect({ first_name, last_name, user_name, password }).toEqual({
      first_name: dummyUser.firstName,
      last_name: dummyUser.lastName,
      user_name: dummyUser.userName,
      password: hashPassword,
    });
  });

  it("UPDATE method should return a user updated by id", async () => {
    const hashPassword = bcrypt.hashSync("123456", 10);
    const { first_name, last_name, user_name, password } =
      await actionUser.updateUser(dummyUser.id || "", {
        firstName: "Phat1",
        lastName: "Lee1",
        userName: "phatlee1",
        password: hashPassword,
      });

    expect({
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      password: password,
    }).toEqual({
      first_name: "Phat1",
      last_name: "Lee1",
      user_name: "phatlee1",
      password: hashPassword,
    });
  });

  it("Add method should return a token", async () => {
    const tokenDummyUser = await actionUser.addUser(dummyUser);
    expect(tokenDummyUser).toBeDefined();

    const hashPassword = bcrypt.hashSync(dummyUser.password, 10);
    const validPassword = bcrypt.compareSync(hashPassword, dummyUser.password);
    expect(validPassword).toBeTrue();
    const user: Users = {
      ...dummyUser,
      password: hashPassword,
    };
    const token = createToken(user);
    expect(token).toBe(tokenDummyUser);
  });

  it("DELETE method should delete a user by id", async () => {
    await actionUser.deleteUser(dummyUser.id || "");
    const result = await actionUser.showUser(dummyUser.id || "");
    expect(result).toBe(undefined);
  });
});
