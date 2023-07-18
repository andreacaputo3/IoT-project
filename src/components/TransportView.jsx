
import React, { Component } from 'react';

class TransportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departurePlace: '',
      arrivalPlace: '',
      productId: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { departurePlace, arrivalPlace, productId } = this.state;
    this.props.onSubmit(departurePlace, arrivalPlace, productId);
    // Reset the form fields
    this.setState({
      departurePlace: '',
      arrivalPlace: '',
      productId: '',
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { departurePlace, arrivalPlace, productId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="departurePlace">Departure Place:</label>
          <input
            type="text"
            id="departurePlace"
            name="departurePlace"
            value={departurePlace}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="arrivalPlace">Arrival Place:</label>
          <input
            type="text"
            id="arrivalPlace"
            name="arrivalPlace"
            value={arrivalPlace}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={productId}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class TransportPage extends Component {
  handleTransportSubmit = (departurePlace, arrivalPlace, productId) => {
    // Do something with the form data, e.g., make a request to store the transport data
    console.log('Transport data:', departurePlace, arrivalPlace, productId);
  };

  render() {
    return (
      <div>
        <h1>Transport Form</h1>
        <TransportView onSubmit={this.handleTransportSubmit} />
      </div>
    );
  }
}

export default TransportPage;
