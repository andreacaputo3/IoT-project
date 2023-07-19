// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract AcquisitionContract {
    mapping(uint => Acquisition) public acquisitions;
    uint public acquisitionCount = 0;

    struct Acquisition {
        uint acquisitionId;
        uint datetime;
        uint registeredTemperature;
        uint registeredHumidity;
        bool hasProblems;
        uint transportId;
    }

    function addAcquisition(uint _datetime, uint _registeredTemperature, uint _registeredHumidity, bool _hasProblems, uint _transportId) public {
        acquisitionCount ++;
        acquisitions[acquisitionCount] = Acquisition(
            acquisitionCount,
            _datetime,
            _registeredTemperature,
            _registeredHumidity,
            _hasProblems,
            _transportId
        );
    }

    function updateTemperature(uint _acquisitionId, uint _registeredTemperature) 
    public {
        require(_acquisitionId > 0 && _acquisitionId <= acquisitionCount, "Invalid acquisition ID");
        acquisitions[_acquisitionId].registeredTemperature = _registeredTemperature;
    }

    function updateHumidity(uint _acquisitionId, uint _registeredHumidity) 
    public {
        require(_acquisitionId > 0 && _acquisitionId <= acquisitionCount, "Invalid acquisition ID");
        acquisitions[_acquisitionId].registeredHumidity = _registeredHumidity;
    }

    function updateProblems(uint _acquisitionId, bool _hasProblems) public {
        require(_acquisitionId > 0 && _acquisitionId <= acquisitionCount, "Invalid transport ID");
        acquisitions[_acquisitionId].hasProblems = _hasProblems;
    }

    function getAcquisitionsByTransportId(uint _transportId) public view returns (Acquisition[] memory) {
        require(_transportId > 0, "Invalid transport ID");

        uint count = 0;
        for (uint i = 1; i <= acquisitionCount; i++) {
            if (acquisitions[i].transportId == _transportId) {
                count++;
            }
        }

        Acquisition[] memory result = new Acquisition[](count);
        uint index = 0;
        for (uint i = 1; i <= acquisitionCount; i++) {
            if (acquisitions[i].transportId == _transportId) {
                result[index] = acquisitions[i];
                index++;
            }
        }
        return result;
    }
}
