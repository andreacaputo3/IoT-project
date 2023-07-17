// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract CourierContract {
    mapping(uint => Courier) public couriers;
    uint public courierCount;

    struct Courier {
        uint courierId;
        string name;
        string surname;
        string email;
        uint transportId;
    }

    event CourierAdded(string name, string surname, string email, uint transportId);

    function addCourier(string memory _name, string memory _surname, string memory _email, uint _transportId) public {
        courierCount++;
        couriers[courierCount] = Courier(courierCount, _name, _surname, _email, _transportId);
        emit CourierAdded(_name, _surname, _email, _transportId);
    }
}
