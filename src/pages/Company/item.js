import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Scanner() {
  const [product, setProduct] = useState(null);
  const [productCode, setProductCode] = useState('');

  const handleScan = (event) => {
    event.preventDefault();
    axios.get(`/api/products/${productCode}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
  };

  const handleCodeChange = (event) => {
    setProductCode(event.target.value);
  };

  return (
    <div>
      <h1>Product Scanner</h1>
      <form onSubmit={handleScan}>
        <label>
          Product code:
          <input type="text" value={productCode} onChange={handleCodeChange} />
        </label>
        <button type="submit">Scan</button>
      </form>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}

export default Scanner;