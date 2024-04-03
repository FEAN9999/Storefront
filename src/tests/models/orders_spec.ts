import dotenv from "dotenv";
import { Order, OrderProduct, Product } from "../../common/interface";
import actionOrder from "../../models/orders";
import actionUser from "../../models/users";
import actionProduct from "../../models/products";
const bcrypt = require("bcrypt");

dotenv.config();

let dummyData = {
  user_id: "",
  product_id: "",
  order_id: "",
  order_product_id: "",
};

describe("Order Model", () => {
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

  it("should have an INDEX method", () => {
    expect(actionOrder.indexOrders).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(actionOrder.showOrder).toBeDefined();
  });

  it("should have a UPDATE method", () => {
    expect(actionOrder.updateOrder).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(actionOrder.addOrder).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(actionOrder.deleteOrder).toBeDefined();
  });

  it("CREATE method should add a Order", async () => {
    const { id, user_id, status } = await actionOrder.addOrder({
      user_id: dummyData.user_id,
      status: "active",
    });
    dummyData.order_id = id;
    expect({ user_id, status }).toEqual({
      user_id: dummyData.user_id,
      status: "active",
    });
  });

  it("INDEX method should return a list of Orders", async () => {
    const listOrders = await actionOrder.indexOrders();
    expect(listOrders).toBeDefined();
  });

  it("SHOW method should return a Order by id", async () => {
    const { user_id, status } = await actionOrder.showOrder(dummyData.order_id);

    expect({ user_id, status }).toEqual({
      user_id: dummyData.user_id,
      status: "active",
    });
  });

  it("UPDATE method should return a Order updated by id", async () => {
    const { user_id, status } = await actionOrder.updateOrder(
      dummyData.order_id,
      {
        user_id: dummyData.user_id,
        status: "active",
      }
    );

    expect({ user_id, status }).toEqual({
      user_id: dummyData.user_id,
      status: "active",
    });
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    const { id, quantity, order_id, product_id } =
      await actionOrder.addOrderProduct({
        quantity: 20,
        order_id: dummyData.order_id || "",
        product_id: dummyData.product_id || "",
      });
    dummyData.order_product_id = id;
    expect({ quantity, order_id, product_id }).toEqual({
      quantity: 20,
      order_id: dummyData.order_id || "",
      product_id: dummyData.product_id || "",
    });
  });

  it("DELETE order product method should remove an order product by order product id", async () => {
    const result = await actionOrder.deleteOrderProduct(
      dummyData.order_product_id || ""
    );
    expect(result).toBe("OrderProduct deleted");
  });

  it("DELETE method should delete a Order by id", async () => {
    await actionOrder.deleteOrder(dummyData.order_id || "");
    const result = await actionOrder.showOrder(dummyData.order_id || "");
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await actionUser.deleteUser(dummyData.user_id);
    await actionProduct.deleteProduct(dummyData.product_id);
  });
});
