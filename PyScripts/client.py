import socket
import web3_utils
from datetime import datetime
import sys
import time

def isThereAProblem(ideal, detected):
    upper = ideal + (ideal*0.1)
    lower = ideal - (ideal*0.1)
    if (detected < lower or detected > upper):
        return True
    else:
        return False

def client_program():
    host = '172.20.10.3'  # Indirizzo IP del server o 'localhost' se il server è in esecuzione sulla stessa macchina
    port = 5003  

    #Indirizzo del provider (es. Ganache)
    blockchain_address = 'http://localhost:7545'

    # Crea un'istanza di Web3 connessa al provider Ethereum
    web3 = web3_utils.get_web3_instance(blockchain_address)

    # Imposta l'account predefinito
    web3.eth.defaultAccount = web3.eth.accounts[0]

    # Ottieni l'identificatore di rete
    network_id = web3_utils.get_network_id(web3)

    # Creazione delle istanze dei contratti
    compiled_contract_path_acquisition = '../src/abis/AcquisitionContract.json'
    compiled_contract_path_product = '../src/abis/ProductContract.json'
    compiled_contract_path_transport = '../src/abis/TransportContract.json'

    acquisitionContract = web3_utils.get_contract_instance(compiled_contract_path_acquisition, network_id, web3)
    productContract = web3_utils.get_contract_instance(compiled_contract_path_product, network_id, web3)
    transportContract = web3_utils.get_contract_instance(compiled_contract_path_transport, network_id, web3)

    transportId = input("Inserisci il trasporto per cui fare acquisizioni: ")
    transportData = transportContract.functions.getTransportByID(int(transportId)).call()
    productId = transportData[4]
    transportContract.functions.updateTransportStateShipped(int(transportId)).transact({'from': web3.eth.defaultAccount})
    print("Trasporto spedito")
    productData = productContract.functions.getProductById(productId).call()
   

    while True:
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # Creazione del socket TCP

            client_socket.connect((host, port))  # Connessione al server
            data = client_socket.recv(1024).decode()  # Ricezione dei dati dal server
            now = datetime.now()
            #dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
            #print("now =", dt_string)
            ts = int(datetime.timestamp(now))

            # Utilizzo di split() per separare la stringa sulla base delle graffe
            data_list = data.split('-')

            # Estrazione dei valori tra graffe e rimozione di spazi bianchi
            registeredTemperature = int(data_list[0])
            registeredHumidity = int(data_list[1])
            print(f"Temperatura registrata: {registeredTemperature} °C")
            print(f"Umidità registrata: {registeredHumidity} %")

            hasProblems = isThereAProblem(productData[1],registeredTemperature)
            if (hasProblems == False):
                hasProblems = isThereAProblem(productData[2],registeredHumidity)

            # gas price
            gas_price = web3.eth.gas_price

            tx_hash = acquisitionContract.functions.addAcquisition(ts,registeredTemperature,registeredHumidity,hasProblems,
            int(transportId)).transact({'from': web3.eth.defaultAccount})
            print("Dati memorizzati...")

            # Ottieni il receipt della transazione
            transaction_receipt = web3.eth.get_transaction_receipt(tx_hash)

            # Verifica se il receipt è valido (la transazione è stata confermata)
            if transaction_receipt is not None:
                # Recupera il gas limit dalla receipt
                gas_limit = transaction_receipt['gasUsed']

            # Calcola il costo totale della transazione
            transaction_cost = gas_price * gas_limit

            print("Gas Price:", gas_price)
            print("Gas Limit:", gas_limit)
            print("Transaction Cost:", web3.from_wei(transaction_cost, "ether"), "ETH")
            
            client_socket.close()  # Chiusura della connessione
            time.sleep(60)

        except KeyboardInterrupt:
            transportContract.functions.updateTransportStateDelivered(int(transportId)).transact({'from': web3.eth.defaultAccount})
            print("\nIl trasporto è stato consegnato")
            sys.exit()


       
if __name__ == '__main__':
    client_program()