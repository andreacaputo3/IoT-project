const TransportContract = artifacts.require("TransportContract");

contract("TransportContract", accounts => {
  let transportContract;

  before(async () => {
    transportContract = await TransportContract.deployed();
  });

  it("should add a new transport", async () => {
    const transportId = 1;
    const departurePlace = "New York";
    const arrivalPlace = "Los Angeles";
    const productId = 123;

    await transportContract.addTransport(departurePlace, arrivalPlace, productId);

    const transport = await transportContract.getTransportByID(transportId);

    assert.equal(transport.transportId.toNumber(), transportId, "Incorrect transport ID");
    assert.equal(transport.departurePlace, departurePlace, "Incorrect departure place");
    assert.equal(transport.arrivalPlace, arrivalPlace, "Incorrect arrival place");
    assert.equal(transport.transportState, "In spedizione", "Incorrect transport state");
    assert.equal(transport.productId.toNumber(), productId, "Incorrect product ID");
  });
});
