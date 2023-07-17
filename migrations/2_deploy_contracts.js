const TransportContract = artifacts.require("TransportContract");
const ProductContract = artifacts.require("ProductContract");
const CourierContract = artifacts.require("CourierContract");
const AcquisitionContract = artifacts.require("AcquisitionContract");

module.exports = function(deployer) {
    deployer.deploy(TransportContract);
    deployer.deploy(ProductContract);
    deployer.deploy(CourierContract);
    deployer.deploy(AcquisitionContract);
};
