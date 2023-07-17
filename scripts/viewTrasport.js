const ContractName = artifacts.require("./contracts/TransportContract");

module.exports = async function(callback) {
    try {
        // Ottieni l'istanza del contratto sulla rete
        const contractInstance = await ContractName.deployed();

        // Definisci l'ID del trasporto che desideri leggere
        const transportId = 1; // Sostituisci con l'ID del trasporto desiderato

        // Ottieni i dettagli del trasporto
        const transport = await contractInstance.transports(transportId);

        // Converti gli oggetti BigNumber in stringhe o tipi appropriati, se necessario
        const transportIdString = transport.transportId.toString();
        const transportDate = new Date(transport.date.toNumber() * 1000).toISOString();
        const departureDateTime = new Date(transport.departureDateTime.toNumber() * 1000).toISOString();
        const arrivalDateTime = new Date(transport.arrivalDateTime.toNumber() * 1000).toISOString();
        const temperatureRecorded = transport.registeredTemperature.toNumber();
        const hasProblems = transport.hasProblems;

        // Visualizza i dettagli del trasporto
        console.log("Transport ID:", transportIdString);
        console.log("Transport Date:", transportDate);
        console.log("Departure Date/Time:", departureDateTime);
        console.log("Arrival Date/Time:", arrivalDateTime);
        console.log("Temperature Recorded:", temperatureRecorded);
        console.log("Has Problems:", hasProblems);
    } catch (error) {
        console.error("Error:", error);
    }

    callback();
};
