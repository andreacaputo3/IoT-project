# Importa tutto il modulo
import web3_utils

# Configura l'indirizzo del provider Ethereum (es. Ganache)
blockchain_address = 'http://localhost:7545'

# Crea un'istanza di Web3 connessa al provider Ethereum
web3 = web3_utils.get_web3_instance(blockchain_address)

# Imposta l'account predefinito (account mittente per le transazioni)
web3.eth.defaultAccount = web3.eth.accounts[0]

# Ottieni l'identificatore di rete
network_id = web3_utils.get_network_id(web3)

# Path al file JSON compilato del contratto
compiled_contract_path = 'abis/AcquisitionContract.json'

# Ottieni l'indirizzo del contratto dal file JSON
deployed_contract_address = web3_utils.get_contract_address_from_json(compiled_contract_path, network_id)
print("Contract Address:", deployed_contract_address)

# Ottieni un'istanza del contratto
contract = web3_utils.get_contract_instance(compiled_contract_path, deployed_contract_address, web3)

# Esempio di chiamata a una funzione del contratto
datetime = 1658144357
registeredTemperature = 25
registeredHumidity = 40
hasProblems = False
transportId = 1

tx_hash = contract.functions.addAcquisition(datetime,registeredTemperature,registeredHumidity,hasProblems,
    transportId).transact({'from': web3.eth.defaultAccount})
print("Transaction Hash:", tx_hash)
