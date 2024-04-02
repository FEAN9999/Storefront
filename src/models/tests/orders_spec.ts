import dotenv from "dotenv";
import { Order, OrderProduct, Product } from "../../common/interface";
import actionOrder from "../orders";

dotenv.config();

const dummyOrder: Order = {
  id: crypto.randomUUID(),
  user_id: "123",
  status: "active",
};

const dummyProduct: Product = {
  id: crypto.randomUUID(),
  name: "product1",
  price: 1000,
};

const dummyOrderProduct: OrderProduct = {
  id: crypto.randomUUID(),
  order_id: dummyOrder.id || "",
  product_id: dummyProduct.id || "",
  quantity: 2,
};

describe("Order Model", () => {
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
    const { user_id, status } = await actionOrder.addOrder({
      user_id: dummyOrder.user_id,
      status: dummyOrder.status,
    });
    expect({ user_id, status }).toEqual({
      user_id: dummyOrder.user_id,
      status: dummyOrder.status,
    });
  });

  it("INDEX method should return a list of Orders", async () => {
    const listOrders = await actionOrder.indexOrders();
    expect(listOrders).toEqual([
      {
        user_id: dummyOrder.user_id,
        status: dummyOrder.status,
      },
    ]);
  });

  it("SHOW method should return a Order by id", async () => {
    const { user_id, status } = await actionOrder.showOrder(
      dummyOrder.id || ""
    );

    expect({ user_id, status }).toEqual({
      user_id: dummyOrder.user_id,
      status: dummyOrder.status,
    });
  });

  it("UPDATE method should return a Order updated by id", async () => {
    const { user_id, status } = await actionOrder.updateOrder(
      dummyOrder.id || "",
      {
        user_id: dummyOrder.user_id,
        status: dummyOrder.status,
      }
    );

    expect({ user_id, status }).toEqual({
      user_id: dummyOrder.user_id,
      status: dummyOrder.status,
    });
  });

  it("DELETE method should delete a Order by id", async () => {
    await actionOrder.deleteOrder(dummyOrder.id || "");
    const result = await actionOrder.showOrder(dummyOrder.id || "");
    expect(result).toBe(undefined);
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    const { quantity, order_id, product_id } =
      await actionOrder.addOrderProduct({
        quantity: dummyOrderProduct.quantity,
        order_id: dummyOrder.id || "",
        product_id: dummyProduct.id || "",
      });

    expect({ quantity, order_id, product_id }).toEqual({
      quantity: dummyOrderProduct.quantity,
      order_id: dummyOrder.id || "",
      product_id: dummyProduct.id || "",
    });
  });

  it("DELETE order product method should remove an order product by order product id", async () => {
    const result = await actionOrder.deleteOrderProduct(
      dummyOrderProduct.id || ""
    );
    expect(result).toBe("OrderProduct deleted");
  });
});
