import { Users } from "../common/interface";
import client from "../database";

const crypto = require("crypto");

const indexUsers = async () => {
  try {
    const conn = await client.connect();
    const result = await conn.query("SELECT * FROM users");
    conn.release();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const showUser = async (id: string) => {
  try {
    const sql = "SELECT * FROM users WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const addUser = async (user: Users) => {
  try {
    const sql =
      "INSERT INTO users (id, first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const conn = await client.connect();
    const result = await conn.query(sql, [
      crypto.randomUUID(),
      user.firstName,
      user.lastName,
      user.userName,
      user.password,
    ]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id: string) => {
  try {
    const sql = "DELETE FROM users WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id: string, user: Users) => {
  try {
    const sql =
      "UPDATE users SET first_name=($1), last_name=($2), user_name=($3), password=($4) WHERE id=($5) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      user.firstName,
      user.lastName,
      user.userName,
      user.password,
      id,
    ]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const actionUser = {
  indexUsers,
  showUser,
  addUser,
  deleteUser,
  updateUser,
};

export default actionUser;
