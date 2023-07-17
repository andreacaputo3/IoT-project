import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import TransportContract from '../abis/TransportContract.json';
import Navbar from './Navbar';
import logo from '../logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      transportContract: null,
      transportCount: 0,
      transports: [],
    };
  }

  componentDidMount() {
    this.loadWeb3();
    this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = TransportContract.networks[networkId];
    if (networkData) {
      const transportContract = new web3.eth.Contract(
        TransportContract.abi,
        networkData.address
      );
      this.setState({ transportContract });
      const transportCount = await transportContract.methods.transportCount().call();

      this.setState({ transportCount });
      for (let i = 1; i <= transportCount; i++) {
        const transport = await transportContract.methods.transports(i).call();
        console.log(transport.departurePlace);
        console.log(transport.arrivalPlace);

        this.setState({
          transports: [...this.state.transports, transport],
        });
      }
    } else {
      window.alert('TransportContract not deployed to detected network.');
    }
  };

  render() {
  const { account, transports } = this.state;

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <h1>Sample</h1>
              <p>
                Edit <code>src/components/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                LEARN BLOCKCHAIN <u><b>NOW! </b></u>
              </a>
              <h2>All Transports</h2>
              {transports.map((transport) => (
                <div key={transport.transportId}>
                  <p>ID trasporto: {transport.transportId.toString()}</p>
                  <p>Departure Place: {transport.departurePlace}</p>
                  <p>Arrival Place: {transport.arrivalPlace}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

}

export default App;