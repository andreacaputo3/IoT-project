import socket
import web3_utils
from datetime import datetime
import sys
import time

def isThereAProblem(ideal, detected):
    upper = ideal + (ideal*0.1)
    lower = ideal - (ideal*0.1)
    print("{0} - {1}".format(upper, lower))
    if (detected < lower or detected > upper):
        return True
    else:
        return False

def client_program():
    host = '192.168.1.51'  # Indirizzo IP del server o 'localhost' se il server è in esecuzione sulla stessa macchina
    port = 5003  # Porta utilizzata dal server

    #Indirizzo del provider (es. Ganache)
    blockchain_address = 'http://localhost:7545'

    # Crea un'istanza di Web3 connessa al provider Ethereum
    web3 = web3_utils.get_web3_instance(blockchain_address)

    # Imposta l'account predefinito
    web3.eth.defaultAccount = web3.eth.accounts[0]

    # Ottieni l'identificatore di rete
    network_id = web3_utils.get_network_id(web3)

    # Path al file JSON compilato del contratto
    compiled_contract_path_acquisition = '../src/abis/AcquisitionContract.json'
    compiled_contract_path_product = '../src/abis/ProductContract.json'
    compiled_contract_path_transport = '../src/abis/TransportContract.json'

    deployed_contract_address_transport = web3_utils.get_contract_address_from_json(compiled_contract_path_transport, network_id)
    transportContract = web3_utils.get_contract_instance(compiled_contract_path_transport, deployed_contract_address_transport, web3)

    transportId = input("Inserisci il trasporto per cui fare acquisizioni: ")
    transportData = transportContract.functions.getTransportByID(int(transportId)).call()
    productId = transportData[4]
    transportContract.functions.updateTransportStateShipped(int(transportId)).transact({'from': web3.eth.defaultAccount})
    print("Trasporto spedito")
    deployed_contract_address_product = web3_utils.get_contract_address_from_json(compiled_contract_path_product, network_id)
    productContract = web3_utils.get_contract_instance(compiled_contract_path_product, deployed_contract_address_product, web3)
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
            print(ts)
            print(f"Risposta dal server: {data}")

            # Utilizzo di split() per separare la stringa sulla base delle graffe
            data_list = data.split('-')

            # Estrazione dei valori tra graffe e rimozione di spazi bianchi
            registeredTemperature = int(data_list[0])
            registeredHumidity = int(data_list[1])
            hasProblems = isThereAProblem(productData[1],registeredTemperature)
            hasProblems = isThereAProblem(productData[2],registeredHumidity)

            deployed_contract_address_acquisition = web3_utils.get_contract_address_from_json(compiled_contract_path_acquisition, network_id)
            acquisitionContract = web3_utils.get_contract_instance(compiled_contract_path_acquisition, deployed_contract_address_acquisition, web3)

            tx_hash = acquisitionContract.functions.addAcquisition(ts,registeredTemperature,registeredHumidity,hasProblems,
            int(transportId)).transact({'from': web3.eth.defaultAccount})
            print("Transaction Hash:", tx_hash)

            client_socket.close()  # Chiusura della connessione
            time.sleep(10)

        except KeyboardInterrupt:
            transportContract.functions.updateTransportStateDelivered(int(transportId)).transact({'from': web3.eth.defaultAccount})
            print("\nIl trasporto è stato consegnato")
            sys.exit()


       
if __name__ == '__main__':
    client_program()