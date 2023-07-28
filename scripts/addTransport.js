const Web3 = require("web3");
const TransportContract = artifacts.require("./contracts/TransportContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await TransportContract.deployed();

        // Definisci i parametri per il nuovo trasporto
        const departurePlace = "Roma";
        const arrivalPlace = "Milano";
        const productId = 1;

        // Stima il gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Crea l'oggetto della transazione per stimare il gas limit
        const transactionObject = {
            from: web3.eth.accounts[0],
            gasPrice: gasPrice,
        };

        // Stima il gas limit per la transazione
        await contractInstance.addTransport(departurePlace, arrivalPlace, productId);
        const gasLimit = await contractInstance.addTransport.estimateGas(departurePlace, arrivalPlace, productId, transactionObject);

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
