import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
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
          <select className="categories-dropdown">
            <option>All categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Garden</option>
          </select>
        </div>
      </header>
  );
};

export default TopBar;
