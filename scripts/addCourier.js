const CourierContract = artifacts.require("./contracts/CourierContract");

module.exports = async function(callback) {
  try {
    // Ottieni l'istanza del contratto sulla rete
    const contractInstance = await CourierContract.deployed();

    // Definisci i parametri per il nuovo corriere
    const courierId = 1;
    const name = "Jonathan";
    const surname = "Joe";
    const email = "john.Joe@example.com";
    const transportId = 1; // ID del trasporto associato al corriere

    // Aggiungi il corriere utilizzando la funzione addCourier del contratto
    // Stima il gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Crea l'oggetto della transazione per stimare il gas limit
    const transactionObject = {
          from: web3.eth.accounts[0],
          gasPrice: gasPrice,
      };

    // Stima il gas limit per la transazione
    await contractInstance.addCourier(name, surname, email, transportId);
    const gasLimit = await contractInstance.addCourier.estimateGas(name, surname, email, transportId, transactionObject);

    // Calcola il costo totale della transazione
    const transactionCost = gasPrice * gasLimit;

    console.log("Gas Price:", gasPrice);
    console.log("Gas Limit:", gasLimit);
    console.log("Transaction Cost:", web3.utils.fromWei(transactionCost.toString(), "ether"), "ETH");
    
    
  } catch (error) {
    console.error("Error:", error);
  }

  callback();
};
