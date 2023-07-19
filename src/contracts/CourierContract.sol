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

    function getCourierByTransportId(uint _transportId) public view returns (
        uint courierId,
        string memory name,
        string memory surname,
        string memory email,
        uint transportId
    ) {
        // Make sure the transport has a valid id
        require(_transportId > 0, "Invalid transport ID");

        Courier memory _courier = couriers[_transportId];
        return (
            _courier.courierId,
            _courier.name,
            _courier.surname,
            _courier.email,
            _courier.transportId
        );
    }
}
