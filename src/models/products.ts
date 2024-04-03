import { Product } from "../common/interface";
import client from "../database";

const crypto = require("crypto");

const indexProducts = async () => {
  try {
    const conn = await client.connect();
    const result = await conn.query("SELECT * FROM products");
    conn.release();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const showProduct = async (id: string) => {
  try {
    const sql = "SELECT * FROM products WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const addProduct = async (product: Product) => {
  try {
    const sql =
      "INSERT INTO products (id, name, price) VALUES ($1, $2, $3) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      crypto.randomUUID(),
      product.name,
      product.price,
    ]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (id: string) => {
  try {
    const sql = "DELETE FROM products WHERE id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const updateProduct = async (id: string, product: Product) => {
  try {
    const sql =
      "UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [product.name, product.price, id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const actionProduct = {
  addProduct,
  deleteProduct,
  indexProducts,
  showProduct,
  updateProduct,
};

export default actionProduct;
