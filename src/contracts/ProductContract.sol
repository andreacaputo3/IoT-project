// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ProductContract {
    struct Product {
        uint productId;
        string productType;
        uint idealTemperature;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    function addProduct(string memory _productType, uint _idealTemperature) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _productType,
            _idealTemperature
        );
    }

    function getProductByName(string memory _productType) public view returns (uint, string memory, uint) {
        for (uint i = 1; i <= productCount; i++) {
            //stringhe in Solidity non possono essere confrontate direttamente usando l'operatore di uguaglianza
            if (keccak256(bytes(products[i].productType)) == keccak256(bytes(_productType))) {
                return (
                    products[i].productId,
                    products[i].productType,
                    products[i].idealTemperature
                );
            }
        }
        return (0, "", 0);
    }
}
