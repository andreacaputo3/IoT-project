import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Web3 from 'web3';
import TransportContract from '../abis/TransportContract.json';
import AcquisitionContract from '../abis/AcquisitionContract.json';
import CourierContract from '../abis/CourierContract.json';
import ProductContract from '../abis/ProductContract.json';


const HomePage = () => {
  const [validated, setValidated] = useState(false);
  const [transportData, setTransportData] = useState(null);
  const [acquisitionData, setAcquisitionData] = useState([]);
  const [courierData, setCourierData] = useState(null);
  const [productData, setProductData] = useState(null);
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
          const courierContract = new web3.eth.Contract(
            CourierContract.abi,
            CourierContract.networks[networkId].address
          );
          const productContract = new web3.eth.Contract(
            ProductContract.abi,
            ProductContract.networks[networkId].address
          );

          const transportData = await transportContract.methods.getTransportByID(transportId).call();
          const acquisitionData = await acquisitionContract.methods.getAcquisitionsByTransportId(transportId).call();
          const courierData = await courierContract.methods.getCourierByTransportId(transportId).call();
          const productId = transportData.productId;
          const productData = await productContract.methods.getProductById(productId).call();

          // Imposta i dati del trasporto e delle acquisizioni nello stato
          setTransportData(transportData);
          setAcquisitionData(acquisitionData);
          setCourierData(courierData);
          setProductData(productData);
          setError(null);
        }
      } catch (error) {
        console.error('Error reading data from blockchain:', error);
        setTransportData(null);
        setAcquisitionData([]);
        setCourierData(null);
        setProductData(null);
        setError('Errore nella lettura dei dati dalla blockchain');
      }
    }
    setValidated(true);
  };

  return (
    <div className="homepage">
      <div className="container">
        <h1 className="text-center mt-4">Benvenuto nella sezione dedicata alle spedizioni</h1>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-center mt-4">
            <Col md={5}>
              <Form.Group controlId="validationCustom01">
                <Form.Label className="ml-2">
                  <strong>Inserisci l'identificativo del trasporto che vuoi visionare</strong>
                </Form.Label>
                <Form.Control required type="text" name="transportId" placeholder="Identificativo" />
                <Form.Control.Feedback type="invalid">
                  Inserisci un identificativo valido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button type="submit" variant="primary">Cerca</Button>
          </div>
        </Form>

        {transportData && (
          <div className="transport-details mt-4">
            <h2 className="text-center">Dati del Trasporto</h2>
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  <strong>Luogo di partenza:</strong> {transportData.departurePlace}
                </p>
                <p className="card-text">
                  <strong>Luogo di arrivo:</strong> {transportData.arrivalPlace}
                </p>
                <p className="card-text">
                  <strong>Stato del trasporto:</strong> {transportData.transportState}
                </p>
              </div>
            </div>
          </div>
        )}

        {productData && (
          <div className="product-details mt-4">
            <h2 className="text-center">Prodotto Trasportato</h2>
            <div className="card">
              <div className="card-body">
                <p className="card-text">
                  <strong>Tipologia:</strong> {productData[0]}
                </p>
                <p className="card-text">
                  <strong>Temperatura ideale di conservazione:</strong> {productData[1].toLocaleString()}
                </p>
                <p className="card-text">
                  <strong>Umidità ideale di conservazione:</strong> {productData[2].toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {courierData && courierData.name !== "" &&  (
          <div className="courier-details mt-4">
            <h2 className="text-center">Corriere Incaricato del Trasporto</h2>
            <div className="card p-4">
              <p className="card-text mb-2">
                <strong>Nome:</strong> {courierData.name}
              </p>
              <p className="card-text mb-2">
                <strong>Cognome:</strong> {courierData.surname}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {courierData.email}
              </p>
            </div>
          </div>
        )}

        {acquisitionData.length > 0 && (
          <div className="acquisition-details mt-4">
            <h2 className="text-center">Acquisizioni associate</h2>
            <div>
              {acquisitionData.map((acquisition) => (
                <div key={acquisition.acquisitionId} className="card mb-3">
                  <div className="card-body d-flex flex-wrap">
                    <div className="mx-3">
                      <strong>Data rilevazione:</strong> {new Date(acquisition.datetime * 1000).toLocaleString()}
                    </div>
                    <div className="mx-3">
                      <strong>Temperatura registrata:</strong> {acquisition.registeredTemperature.toLocaleString()}
                    </div>
                    <div className="mx-3">
                      <strong>Umidità registrata:</strong> {acquisition.registeredHumidity.toLocaleString()}
                    </div>
                    <div>
                      <strong>Problemi durante il trasporto:</strong> {acquisition.hasProblems ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {error && <p>{error}</p>}

      </div>

      <style jsx="true">{`
        .homepage,
        .container {
          padding: 130px 0;
          background-color: #f8f9fa;
        }

        .transport-details,
        .acquisition-details,
        .courier-details,
        .product-details {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        .card-group .card {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;