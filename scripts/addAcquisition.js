const AcquisitionContract = artifacts.require("./contracts/AcquisitionContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await AcquisitionContract.deployed();

        // Definisci i parametri per la nuova acquisizione
        const datetime = 1658144357; // 1689750427
        const registeredTemperature = 25; // Temperatura registrata
        const registeredHumidity = 40; // Temperatura registrata
        const hasProblems = false; // Indica se ci sono problemi con l'acquisizione
        const transportId = 1; // ID del trasporto associato all'acquisizione

        // Aggiungi l'acquisizione utilizzando la funzione addAcquisition del contratto
        await contractInstance.addAcquisition(datetime, registeredTemperature, registeredHumidity, hasProblems, transportId);

        // Ottieni i dettagli dell'acquisizione appena aggiunta
        const acquisition = await contractInstance.acquisitions(1); // Assumendo che l'acquisizione abbia ID 1

        // Visualizza i dettagli dell'acquisizione
        console.log("Acquisition ID:", acquisition.acquisitionId.toNumber());
        console.log("Datetime:", new Date(acquisition.datetime * 1000)); // Converti il timestamp in una data leggibile
        console.log("Registered Temperature:", acquisition.registeredTemperature.toNumber());
        console.log("Registered Humidity:", acquisition.registeredHumidity.toNumber());
        console.log("Has Problems:", acquisition.hasProblems);
        console.log("Transport ID:", acquisition.transportId.toNumber());
    } catch (error) {
        console.error("Error:", error);
    }

    callback();
};
