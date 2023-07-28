const ProductContract = artifacts.require("./contracts/ProductContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await ProductContract.deployed();

        // Definisci i parametri per il nuovo prodotto
        const productId = 1;
        const productType = "Patate";
        const idealTemperature = 25;
        const idealHumidity = 35;

        // Stima il gas price
        const gasPrice = await web3.eth.getGasPrice();

        // Crea l'oggetto della transazione per stimare il gas limit
        const transactionObject = {
            from: web3.eth.accounts[0],
            gasPrice: gasPrice,
        };

        // Stima il gas limit per la transazione
        await contractInstance.addProduct(productType, idealTemperature, idealHumidity);
        const gasLimit = await contractInstance.addProduct.estimateGas(productType, idealTemperature, 
            idealHumidity, transactionObject);

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
