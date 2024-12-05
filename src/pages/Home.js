import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [cheapProducts, setCheapProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then((response) => {
        const products = response.data;

        const cheap = products.filter((product) => product.price <= 50);

        const random = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

        setRandomProducts(random);
        setCheapProducts(cheap);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="home">
      <section className="products-section">
        <h2>Random Products</h2>
        <div className="products-grid">
          {randomProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} PLN</p>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2>Products Under 50 PLN</h2>
        <div className="products-grid">
          {cheapProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} PLN</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
