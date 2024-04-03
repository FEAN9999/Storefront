import dotenv from "dotenv";
import actionProduct from "../../models/products";

dotenv.config();

const dummyData = {
  product_id: "",
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
    const { id, name, price } = await actionProduct.addProduct({
      name: "product1",
      price: 1000,
    });
    dummyData.product_id = id;
    expect({ id, name, price }).toEqual({
      id: dummyData.product_id,
      name: "product1",
      price: 1000,
    });
  });

  it("INDEX method should return a list of Products", async () => {
    const listProducts = await actionProduct.indexProducts();
    expect(listProducts).toBeDefined();
  });

  it("SHOW method should return a Product by id", async () => {
    const { name, price } = await actionProduct.showProduct(
      dummyData.product_id
    );

    expect({ name, price }).toEqual({
      name: "product1",
      price: 1000,
    });
  });

  it("UPDATE method should return a Product updated by id", async () => {
    const { name, price } = await actionProduct.updateProduct(
      dummyData.product_id,
      { name: "product1", price: 1000 }
    );

    expect({ name, price }).toEqual({
      name: "product1",
      price: 1000,
    });
  });

  it("DELETE method should delete a Product by id", async () => {
    await actionProduct.deleteProduct(dummyData.product_id);
    const result = await actionProduct.showProduct(dummyData.product_id);
    expect(result).toBe(undefined);
  });
});
