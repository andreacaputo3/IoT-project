const TransportContract = artifacts.require("./contracts/TransportContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await TransportContract.deployed();

        // Definisci i parametri per il nuovo trasporto
        const transportId = 1;
        const departurePlace = "New York";
        const arrivalPlace = "Los Angeles";

        // Aggiungi il trasporto utilizzando la funzione addTransport del contratto
        await contractInstance.addTransport(departurePlace, arrivalPlace,1);

        // Ottieni i dettagli del trasporto appena aggiunto
        const transport = await contractInstance.transports(transportId);

        // Visualizza i dettagli del trasporto
        console.log("Transport ID:", transport.transportId.toNumber());
        console.log("Departure Place:", transport.departurePlace);
        console.log("Arrival Place:", transport.arrivalPlace);
    } catch (error) {
        console.error("Error:", error);
    }

    callback();
};
