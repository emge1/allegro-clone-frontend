import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TopBar.css';

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    axios
        .get(`${BASE_URL}/categories/`)
        .then((response) => setCategories(response.data))
        .catch((error) => console.error('Failed to fetch categories', error));
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/cart/');
    } else {
      alert('You need to log in to access the cart.');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        console.log("Logged out successfully.");
      } else {
        console.error("Logout failed. Server response:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      closeDropdown();
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    if (categoryId === "all") {
      navigate('/');
    } else {
      navigate(`/categories/${categoryId}`);
    }
  };

  return (
      <header className="header">
        <div className="top-bar">
          <Link to="/" className="logo">
            allegro clone
          </Link>

          <div className="search-section">
            <input type="text" placeholder="What are you looking for?" className="search-input" />
            <button className="search-button">Search</button>
          </div>

          <div className="user-section">
            <button className="icon-button">🔔</button>
            <button className="icon-button" onClick={handleClick}>
              🛒
            </button>
            <div className="dropdown">
              <button onClick={toggleDropdown} className="user-link">
                My Allegro
              </button>
              {dropdownVisible && (
                  <div className="dropdown-menu">
                    {isLoggedIn ? (
                        <>
                          <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                            My Profile
                          </Link>
                          <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                            My Orders
                          </Link>
                          <button onClick={handleLogout} className="dropdown-item">
                            Logout
                          </button>
                        </>
                    ) : (
                        <>
                          <Link to="/login" className="dropdown-item" onClick={closeDropdown}>
                            Login
                          </Link>
                          <Link to="/register" className="dropdown-item" onClick={closeDropdown}>
                            Register
                          </Link>
                        </>
                    )}
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="categories-bar">
          <select className="categories-dropdown" onChange={handleCategoryChange}>
            <option value="all">All categories</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
            ))}
          </select>
        </div>
      </header>
  );
};

export default TopBar;
