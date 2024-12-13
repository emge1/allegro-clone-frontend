import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [randomProducts, setRandomProducts] = useState([]);
    const [error, setError] = useState(null);
    const BASE_URL = "http://127.0.0.1:8000";

    useEffect(() => {
        // Fetch subcategories for the category
        axios
            .get(`${BASE_URL}/categories/${categoryId}/subcategories/`)
            .then((response) => setSubcategories(response.data))
            .catch(() => setError('Failed to fetch subcategories'));

        // Fetch products for the category
        axios
            .get(`${BASE_URL}/categories/${categoryId}/products`)
            .then((response) => {
                const products = response.data;

                // Randomize and pick 5 products
                const random = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);

                setRandomProducts(random);
            })
            .catch(() => setError('Failed to fetch products'));
    }, [categoryId]);

    return (
        <div className="category-page">
            {error && <p className="error-message">{error}</p>}

            {/* Subcategories Section */}
            <section className="subcategories-section">
                <h2>Subcategories</h2>
                <div className="subcategories-grid">
                    {subcategories.length > 0 ? (
                        subcategories.map((sub) => (
                            <div key={sub.id} className="subcategory-card">
                                <img
                                    src={sub.thumbnail ? `${BASE_URL}${decodeURIComponent(sub.thumbnail)}` : '/placeholder.jpg'}
                                    alt={sub.title}
                                />
                                <h3>{sub.title}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No subcategories available</p>
                    )}
                </div>
            </section>

            {/* Random Products Section */}
            <section className="products-section">
                <h2>Random Products from Category</h2>
                <div className="products-grid">
                    {randomProducts.length > 0 ? (
                        randomProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.thumbnail ? `${BASE_URL}${product.thumbnail}` : '/placeholder.jpg'}
                                    alt={product.name}
                                />
                                <h3>{product.name}</h3>
                                <p>{product.max_price ? `${product.max_price} PLN` : 'Unavailable'}</p>
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
