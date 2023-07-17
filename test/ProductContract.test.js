const ProductContract = artifacts.require("ProductContract");

contract("ProductContract", (accounts) => {
    let contractInstance;
    const productType = "Electronics";

    beforeEach(async () => {
        contractInstance = await ProductContract.new();
    });

    it("should add a product", async () => {
        await contractInstance.addProduct(productType);

        const product = await contractInstance.products(1);

        assert.equal(product.productId, 1, "Product ID does not match");
        assert.equal(product.productType, productType, "Product type does not match");
    });
});
