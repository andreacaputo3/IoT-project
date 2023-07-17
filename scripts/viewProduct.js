const ContractName = artifacts.require("./contracts/ProductContract");

module.exports = async function() {
    // Ottieni l'istanza del contratto sulla rete
    const contractInstance = await ContractName.deployed();

    // Definisci l'ID del prodotto che vuoi visualizzare
    const productId = 4; // Sostituisci con l'ID del prodotto desiderato

    // Ottieni le informazioni del prodotto
    const product = await contractInstance.products(productId);

    // Converti gli oggetti BigNumber in stringhe
    const productIdString = product.productId.toString();
    const productType = product.productType;

    // Visualizza il valore del prodotto
    console.log("Product ID:", productIdString);
    console.log("Product Type:", productType);
};
