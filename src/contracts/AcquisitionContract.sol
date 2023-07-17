// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract AcquisitionContract {
    mapping(uint => Acquisition) public acquisitions;
    uint public acquisitionCount = 0;

    struct Acquisition {
        uint acquisitionId;
        uint datetime;
        uint registeredTemperature;
        bool hasProblems;
        uint transportId;
    }

    function addAcquisition(uint _datetime, uint _registeredTemperature, bool _hasProblems, uint _transportId) public {
        acquisitionCount ++;
        acquisitions[acquisitionCount] = Acquisition(
            acquisitionCount,
            _datetime,
            _registeredTemperature,
            _hasProblems,
            _transportId
        );
    }

    function updateTemperature(uint _acquisitionId, uint _registeredTemperature) 
    public {
        require(_acquisitionId > 0 && _acquisitionId <= acquisitionCount, "Invalid acquisition ID");
        acquisitions[_acquisitionId].registeredTemperature = _registeredTemperature;
    }

    function updateProblems(uint _acquisitionId, bool _hasProblems) public {
        require(_acquisitionId > 0 && _acquisitionId <= acquisitionCount, "Invalid transport ID");
        acquisitions[_acquisitionId].hasProblems = _hasProblems;
    }
}
