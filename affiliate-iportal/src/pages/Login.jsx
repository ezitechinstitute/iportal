import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { values: { ...formData } };
      const res = await axios.post('http://localhost:5000/api/affiliate/login', payload.values);
    
      if (res.data.userStatus === false) {
        setError('User not found');
      } else if (res.data.passwordStatus === false) {
        setError('Incorrect password');
      } else if (res.data.loginStatus === true && res.data.token) {
        // localStorage.setItem('token', res.data.token);
        localStorage.setItem('affiliateToken', res.data.token);
        localStorage.setItem('affiliateData', JSON.stringify(res.data.user));
        // You can also save user info if needed
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="meeting-illustration">
            <img 
              src="/images/meeting.png" 
              alt="Team Meeting"
              className="auth-illustration"
            />
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <img 
                src="/images/ezitech-logo.png" 
                alt="Ezitech Logo" 
                className="auth-logo"
              />
              <h1>Welcome to Ezitech! 👋</h1>
              <p>Please sign in to your account and start the adventure</p>
            </div>
            {error && <div style={{color:'red',textAlign:'center',marginBottom:'1rem'}}>{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  value={formData.loginEmail}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                  placeholder="············"
                  required
                />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="auth-button">
                Sign in
              </button>
              <div className="auth-footer">
                <p>
                  New on our platform? {' '}
                  <Link to="/register">Create an account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="activate-windows">
        Go to Settings to activate Windows.
      </div>
    </div>
  );
};

export default Login;