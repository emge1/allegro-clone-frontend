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
    // Sprawdź token logowania
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Pobierz listę kategorii
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    closeDropdown();
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    // Jeśli wybrano "All categories", wracamy na stronę główną
    if (categoryId === "all") {
      navigate('/');
    } else {
      // Przekierowanie do strony wybranej kategorii
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
            <button className="icon-button">🛒</button>
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
