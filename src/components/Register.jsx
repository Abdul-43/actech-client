import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../global';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/register`, { username, email, password });
      navigate('/login');
    } catch (error) {
      setError('Error registering user');
      console.error('Error registering', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <div className="card shadow-lg card-cus">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-4">Register</button>
            </form>
            <p className="text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>

      </div>
    </div>
  );
};

export default Register;
