// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract TransportContract {
    mapping(uint => Transport) public transports;
    uint public transportCount = 0;

    struct Transport {
        uint transportId;
        string departurePlace;
        string arrivalPlace;
        string transportState;
        uint productId; //un prodotto a trasporto ma si può ripetere nei trasporti
    }

    function addTransport(string memory _departurePlace, string memory _arrivalPlace, uint _productId) public {
        transportCount ++;
        string memory _transportState = "Pronto alla spedizione";
        transports[transportCount] = Transport(
            transportCount,
            _departurePlace,
            _arrivalPlace,
            _transportState,
            _productId
        );
    }

    function updateTransportStateShipped(uint transportId) public {
        require(transportId <= transportCount, "ID trasporto non valido");

        Transport storage transport = transports[transportId];
        transport.transportState = "Spedito";
    }

    function updateTransportStateDelivered(uint transportId) public {
        require(transportId <= transportCount, "ID trasporto non valido");

        Transport storage transport = transports[transportId];
        transport.transportState = "Consegnato";
    }

    function getTransportByID(uint _transportId) public view returns (
        uint transportId,
        string memory departurePlace,
        string memory arrivalPlace,
        string memory transportState,
        uint productId

    ) {
        // Make sure the transport has a valid id
        require(_transportId <= transportCount, "Invalid transport ID");

        Transport memory _transport = transports[_transportId];
        return (
            _transport.transportId,
            _transport.departurePlace,
            _transport.arrivalPlace,
            _transport.transportState,
            _transport.productId
        );
    }
}
