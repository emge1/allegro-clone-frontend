import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token'); // Pobierz token użytkownika
        if (!token) {
            console.error("No token found. Please log in first.");
            alert("You must be logged in to add items to the cart.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1,
                    price: product.discount_price,
                }),
            });

            if (response.ok) {
                console.log(`Added to cart: ${product.name}`);
                alert(`${product.name} has been added to your cart!`);
            } else {
                const errorData = await response.json();
                console.error("Failed to add to cart:", errorData.detail);
                alert(`Error: ${errorData.detail}`);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the item to the cart.");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`); // Używamy ID z API
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-page">
            <div className="product-header">
                <div className="product-image">
                    <img
                        src={`http://localhost:8000${product.thumbnail}`}
                        alt={product.name}
                    />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-merchant">
                        Brand: <span className="merchant-name">{product.brand}</span>
                    </p>
                    <p className="product-price">
                        Price: <span>{product.discount_price || product.max_price} zł</span>
                    </p>
                    {product.discount_price && (
                        <p className="product-original-price">
                            Original: <span>{product.max_price} zł</span>
                        </p>
                    )}
                    <p className="product-stock">In Stock: {product.in_stock_total}</p>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>

            <div className="product-variants">
                <h2>Product Variants</h2>
                <ul>
                    <li>Color: Red</li>
                    <li>Size: L</li>
                    <li>Material: Cotton</li>
                </ul>
            </div>

            <div className="product-about">
                <h2>About the Product</h2>
                <p>
                    Super Product is the best choice for anyone who values
                    quality and comfort. Perfect for every occasion!
                </p>
            </div>

            <div className="product-description">
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>

            {/* Tags */}
            <div className="product-tags">
                <h2>Tags</h2>
                <span className="tag">#promotion</span>
                <span className="tag">#new</span>
                <span className="tag">#highquality</span>
            </div>

            {/* Ratings Section */}
            <div className="product-rating">
                <h2>Ratings and Reviews</h2>
                <p>Average Rating: 4.5/5 (120 reviews)</p>
            </div>

            <div className="product-long-description">
                <h2>Details</h2>
                <p>{product.long_description}</p>
            </div>

            {/* Questions Section */}
            <div className="product-questions">
                <h2>Questions and Answers</h2>
                <ul>
                    <li>
                        <strong>Question:</strong> Is the product waterproof? <br/>
                        <strong>Answer:</strong> Yes, it is splash resistant.
                    </li>
                    <li>
                        <strong>Question:</strong> What are the dimensions? <br/>
                        <strong>Answer:</strong> 30x20x10 cm.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;
