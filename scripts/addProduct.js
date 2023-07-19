const ProductContract = artifacts.require("./contracts/ProductContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await ProductContract.deployed();

        // Definisci i parametri per il nuovo prodotto
        const productId = 1;
        const productType = "Pane";
        const idealTemperature = 25;
        const idealHumidity = 40;

        // Aggiungi il prodotto utilizzando la funzione addProduct del contratto
        await contractInstance.addProduct(productType, idealTemperature, idealHumidity);

        // Ottieni i dettagli del prodotto appena aggiunto
        const product = await contractInstance.products(productId);

        // Visualizza i dettagli del prodotto
        console.log("Product ID:", product.productId.toNumber());
        console.log("Product Type:", product.productType);
        console.log("Ideal Temperature:", product.idealTemperature.toNumber());
        console.log("Ideal Humidity:", product.idealHumidity.toNumber());

    } catch (error) {
        console.error("Error:", error);
    }

    callback();
};
