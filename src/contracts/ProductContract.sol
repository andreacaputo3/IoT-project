// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ProductContract {
    struct Product {
        uint productId;
        string productType;
        uint idealTemperature;
        uint idealHumidity;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    function addProduct(string memory _productType, uint _idealTemperature, uint _idealHumidity) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _productType,
            _idealTemperature,
            _idealHumidity
        );
    }

    function getProductByName(string memory _productType) public view returns (uint, string memory, uint, uint) {
        for (uint i = 1; i <= productCount; i++) {
            //stringhe in Solidity non possono essere confrontate direttamente usando l'operatore di uguaglianza
            if (keccak256(bytes(products[i].productType)) == keccak256(bytes(_productType))) {
                return (
                    products[i].productId,
                    products[i].productType,
                    products[i].idealTemperature,
                    products[i].idealHumidity
                );
            }
        }
        return (0, "", 0, 0);
    }

    function getProductById(uint _productId) public view returns (string memory productType, uint idealTemperature, uint idealHumidity) {
        // Make sure the transport has a valid id
        require(_productId <= productCount, "Invalid product ID");

        Product memory _product = products[_productId];
        return (
            _product.productType,
            _product.idealTemperature,
            _product.idealHumidity
        );
    }
}
