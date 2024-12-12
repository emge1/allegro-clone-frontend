import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error state before attempting login

    try {
      // Log the data being sent
      console.log("Logging in with:", { email, password });

      const response = await axios.post('http://127.0.0.1:8000/login/', {
        email,
        password,
      });

      // Log the response to debug
      console.log("Server response:", response.data);

      if (response.data && response.data.token) {
        // Save the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Set the authorization header for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Redirect to the home page
        navigate('/');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error("Error logging in:", err);

      // Check if the error has a response from the server
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
      <div className="login-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Log In</button>
        </form>
      </div>
  );
}

export default LoginPage;
