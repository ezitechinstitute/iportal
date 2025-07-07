import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', formData);
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

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@gmail.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
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