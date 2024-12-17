import React, { useState, useEffect } from 'react';
import './CartPage.css';
import {Link} from "react-router-dom";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            console.log("Token from localStorage:", token);

            if (!token) {
                console.error("Token is missing or invalid.");
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/cart/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                });

                console.log("Response status:", response.status);

                if (!response.ok) {
                    if (response.status === 401) {
                        console.error("Unauthorized. Token might be invalid or expired.");
                        throw new Error("Unauthorized. Please log in.");
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data received:", data);

                if (data.items && Array.isArray(data.items)) {
                    setCartItems(data.items);
                } else {
                    console.error("Unexpected data format:", data);
                    throw new Error("Unexpected data format.");
                }
            } catch (err) {
                console.error("Error fetching cart items:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const total = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.thumbnail} alt={item.name} className="cart-item-img"/>
                            <div className="cart-item-info">
                                <Link to={`/products/${item.product.id}`}>
                                    <h2>{item.product.name}</h2>
                                </Link>
                                <p>Price: {parseFloat(item.price).toFixed(2)} zł</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button className="remove-button">Remove</button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <p>Total: <strong>{total.toFixed(2)} zł</strong></p>
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
