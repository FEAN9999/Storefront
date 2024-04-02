import dotenv from "dotenv";
import actionProduct from "../products";
import { Product } from "../../common/interface";

dotenv.config();

const dummyProduct: Product = {
  id: crypto.randomUUID(),
  name: "product1",
  price: 1000,
};

describe("Product Model", () => {
  it("should have an INDEX method", () => {
    expect(actionProduct.indexProducts).toBeDefined();
  });

  it("should have a SHOW method", () => {
    expect(actionProduct.showProduct).toBeDefined();
  });

  it("should have a UPDATE method", () => {
    expect(actionProduct.updateProduct).toBeDefined();
  });

  it("should have a CREATE method", () => {
    expect(actionProduct.addProduct).toBeDefined();
  });

  it("should have a DELETE method", () => {
    expect(actionProduct.deleteProduct).toBeDefined();
  });

  it("CREATE method should add a Product", async () => {
    const { name, price } = await actionProduct.addProduct({
      name: "product1",
      price: 1000,
    });
    expect({ name, price }).toEqual({
      name: "product1",
      price: 1000,
    });
  });

  it("INDEX method should return a list of Products", async () => {
    const listProducts = await actionProduct.indexProducts();
    expect(listProducts).toEqual([
      {
        name: "product1",
        price: 1000,
      },
    ]);
  });

  it("SHOW method should return a Product by id", async () => {
    const { name, price } = await actionProduct.showProduct(
      dummyProduct.id || ""
    );

    expect({ name, price }).toEqual({
      name: dummyProduct.name,
      price: dummyProduct.price,
    });
  });

  it("UPDATE method should return a Product updated by id", async () => {
    const { name, price } = await actionProduct.updateProduct(
      dummyProduct.id || "",
      { name: "product2", price: 2000 }
    );

    expect({ name, price }).toEqual({
      name: "product2",
      price: 2000,
    });
  });

  it("DELETE method should delete a Product by id", async () => {
    await actionProduct.deleteProduct(dummyProduct.id || "");
    const result = await actionProduct.showProduct(dummyProduct.id || "");
    expect(result).toBe(undefined);
  });
});
