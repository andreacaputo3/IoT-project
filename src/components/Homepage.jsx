import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Web3 from 'web3';
import TransportContract from '../abis/TransportContract.json';
import AcquisitionContract from '../abis/AcquisitionContract.json';

const HomePage = () => {
  const [validated, setValidated] = useState(false);
  const [transportData, setTransportData] = useState(null);
  const [acquisitionData, setAcquisitionData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        // Connessione a un provider Ethereum (Esempio con Metamask)
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

          // Leggi il valore dell'input
          const transportId = form.elements.transportId.value;

          const networkId = await web3.eth.net.getId();
          const transportContract = new web3.eth.Contract(
            TransportContract.abi,
            TransportContract.networks[networkId].address
          );
          const acquisitionContract = new web3.eth.Contract(
            AcquisitionContract.abi,
            AcquisitionContract.networks[networkId].address
          );

          const transportData = await transportContract.methods.getTransportByID(transportId).call();
          const acquisitionData = await acquisitionContract.methods.getAcquisitionsByTransportId(transportId).call();

          console.log('Transport data:', transportData.departurePlace);
          console.log('Transport data:', transportData.arrivalPlace);
          console.log('Transport data:', transportData.transportState);

          console.log(acquisitionData);

          const data = new Date(acquisitionData[0].datetime.toNumber() * 1000).toString();
          console.log('Acquisition data:', data);
          console.log('Acquisition data:', acquisitionData[0].registeredTemperature.toString());
          console.log('Acquisition data:', acquisitionData[0].hasProblems);

          const data2 = new Date(acquisitionData[1].datetime.toNumber() * 1000).toString();
          console.log('Acquisition data:', data2);
          console.log('Acquisition data:', acquisitionData[1].registeredTemperature.toString());
          console.log('Acquisition data:', acquisitionData[1].hasProblems);

          

          // Imposta i dati del trasporto e delle acquisizioni nello stato
          setTransportData(transportData);
          setAcquisitionData(acquisitionData);
          setError(null);
        }
      } catch (error) {
        console.error('Error reading transport data from blockchain:', error);
        setTransportData(null);
        setAcquisitionData([]);
        setError('Errore nella lettura dei dati dalla blockchain');
      }
    }
    setValidated(true);
  };

  return (
    <div className="homepage">
      <h1>Benvenuto nella nostra homepage!</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>
              Inserisci l'identificativo del trasporto che vuoi visionare
            </Form.Label>
            <Form.Control required type="text" name="transportId" placeholder="TransportId" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>

        {transportData && (
          <div className="transport-details">
            <h2>Dati del Trasporto</h2>
            <p>Departure Place: {transportData.departurePlace}</p>
            <p>Arrival Place: {transportData.arrivalPlace}</p>
            <p>State: {transportData.transportState}</p>
          </div>
        )}

        {acquisitionData.length > 0 && (
          <div className="acquisition-details">
            <h2>Acquisizioni associate</h2>
            {acquisitionData.map((acquisition) => (
              <div key={acquisition.acquisitionId.toNumber()} className="acquisition">
                <p>Datetime: {new Date(acquisition.datetime * 1000).toLocaleString()}</p>
                <p>Registered Temperature: {acquisition.registeredTemperature.toNumber()}</p>
                <p>Has Problems: {acquisition.hasProblems ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        )}

        {error && <p>{error}</p>}
      </Form>

      <style jsx>{`
        .transport-details {
          margin-top: 20px;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .acquisition-details {
          margin-top: 40px;
        }

        .acquisition {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;