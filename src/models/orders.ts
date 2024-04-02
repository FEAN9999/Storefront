import { Order, OrderProduct } from "../common/interface";
import client from "../database";
const crypto = require("crypto");

const indexOrders = async () => {
  try {
    const conn = await client.connect();
    const sql = "SELECT * FROM orders";
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  } catch (err) {
    throw err;
  }
};
const showOrder = async (id: string) => {
  try {
    const conn = await client.connect();
    const sql = "SELECT * FROM orders WHERE id=($1)";
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const addOrder = async (order: Order) => {
  try {
    const sql =
      "INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      crypto.randomUUID(),
      order.user_id,
      order.status,
    ]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const updateOrder = async (id: string, order: Order) => {
  try {
    const sql =
      "UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [order.user_id, order.status, id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteOrder = async (id: string) => {
  try {
    const sql = "DELETE FROM orders WHERE id=($1)";
    const conn = await client.connect();
    await conn.query(sql, [id]);
    conn.release();
    return "Order deleted";
  } catch (err) {
    throw err;
  }
};

const currentOrderByUserId = async (id: string) => {
  try {
    const sql = "SELECT * FROM orders WHERE user_id=($1)";
    const conn = await client.connect();
    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const addOrderProduct = async (OrderProduct: OrderProduct) => {
  try {
    const sql =
      "INSERT INTO order_products (id, order_id, product_id,quantity) VALUES ($1, $2, $3, $4) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [
      crypto.randomUUID(),
      OrderProduct.order_id,
      OrderProduct.product_id,
      OrderProduct.quantity,
    ]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const deleteOrderProduct = async (id: string) => {
  try {
    const sql = "DELETE FROM order_products WHERE id=($1)";
    const conn = await client.connect();
    await conn.query(sql, [id]);
    conn.release();
    return "OrderProduct deleted";
  } catch (err) {
    throw err;
  }
};

const updateOrderProduct = async (id: string, quantity: number) => {
  try {
    const sql =
      "UPDATE order_products SET quantity=($1) WHERE id=($2) RETURNING *";
    const conn = await client.connect();
    const result = await conn.query(sql, [quantity, id]);
    conn.release();
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const indexOrderProduct = async () => {
  try {
    const sql = "SELECT * FROM order_products";
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const actionOrder = {
  currentOrderByUserId,
  indexOrders,
  showOrder,
  deleteOrder,
  addOrder,
  updateOrder,
  addOrderProduct,
  deleteOrderProduct,
  updateOrderProduct,
  indexOrderProduct,
};

export default actionOrder;
