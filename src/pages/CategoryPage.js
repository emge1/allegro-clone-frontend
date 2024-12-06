import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubcategoriesCategory, fetchProductsCategory } from '../api/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubcategoriesCategory(categoryId)
      .then((response) => setSubcategories(response.data))
      .catch((error) => setError('Failed to fetch subcategories'));

    fetchProductsCategory(categoryId)
      .then((response) => {
        const random = [...response.data].sort(() => 0.5 - Math.random()).slice(0, 5);
        setRandomProducts(random);
      })
      .catch((error) => setError('Failed to fetch products'));
  }, [categoryId]);

  return (
    <div className="category-page">
      {error && <p className="error-message">{error}</p>}

      <section className="subcategories-section">
        <h2>Subcategories</h2>
        <div className="subcategories-grid">
          {subcategories.length > 0 ? (
            subcategories.map((sub) => (
              <div key={sub.id} className="subcategory-card">
                {sub.thumbnail ? (
                  <img src={sub.thumbnail} alt={sub.title} />
                ) : (
                  <div className="placeholder-thumbnail">No Image</div>
                )}
                <h3>{sub.title}</h3>
              </div>
            ))
          ) : (
            <p>No subcategories available</p>
          )}
        </div>
      </section>

      <section className="products-section">
        <h2>Random Products from Category</h2>
        <div className="products-grid">
          {randomProducts.length > 0 ? (
            randomProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.content ? (
                  <img src={product.content} alt={product.name} />
                ) : (
                  <div className="placeholder-thumbnail">No Image</div>
                )}
                <h3>{product.name}</h3>
                <p>Price: {product.max_price ? `${product.max_price} PLN` : 'Unavailable'}</p>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
