import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CartPage from './pages/CartPage';


function App() {
  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
