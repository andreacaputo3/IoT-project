const CourierContract = artifacts.require("./contracts/CourierContract");

module.exports = async function(callback) {
  try {
    // Ottieni l'istanza del contratto sulla rete
    const contractInstance = await CourierContract.deployed();

    // Definisci i parametri per il nuovo corriere
    const courierId = 1;
    const name = "John";
    const surname = "Doe";
    const email = "john.doe@example.com";
    const transportId = 1; // ID del trasporto associato al corriere

    // Aggiungi il corriere utilizzando la funzione addCourier del contratto
    await contractInstance.addCourier(name, surname, email, transportId);

    // Ottieni i dettagli del corriere appena aggiunto
    const courier = await contractInstance.couriers(courierId);

    // Visualizza i dettagli del corriere
    console.log("Name:", courier.name);
    console.log("Surname:", courier.surname);
    console.log("Email:", courier.email);
    console.log("Transport ID:", courier.transportId.toNumber());
  } catch (error) {
    console.error("Error:", error);
  }

  callback();
};
