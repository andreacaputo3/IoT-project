import json
from web3 import Web3, HTTPProvider

# Funzione per ottenere l'indirizzo del contratto da un file JSON
def get_contract_address_from_json(json_path, network_id):
    with open(json_path, 'r') as file:
        contract_data = json.load(file)
    return contract_data['networks'][str(network_id)]['address']

# Funzione per ottenere un'istanza del contratto
def get_contract_instance(contract_path, network_id, web3):
    contract_address = get_contract_address_from_json(contract_path, network_id)
    with open(contract_path) as file:
        contract_json = json.load(file)
        contract_abi = contract_json['abi']
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)
    return contract

# Funzione per ottenere l'istanza di Web3 connessa a un provider Ethereum
def get_web3_instance(provider_url):
    return Web3(HTTPProvider(provider_url))

# Funzione per ottenere l'identificatore di rete
def get_network_id(web3):
    return web3.net.version

# Funzione per ottenere l'account predefinito
def get_default_account(web3):
    return web3.eth.defaultAccount
