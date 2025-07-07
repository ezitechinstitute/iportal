import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    internUsername: '',
    internemail: '',
    internCity: '',
    internPhone: '',
    internGender: '',
    internImage: '',
    internJoinDate: '',
    internDob: '',
    internUniversity: '',
    country: '',
    interviewType: '',
    internTechnology: '',
    internDuration: '',
    internType: '',
    interviewDate: '',
    interviewTime: '',
    referralCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }
    try {
      const payload = { value: { ...formData } };
      const res = await axios.post('http://localhost:5000/api/affiliate/register', payload.value);
      if (res.data.exist) {
        setError('User already exists with this email');
      } else if (res.data === 1 || res.data.affectedRows === 1) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
              <h1>Adventure starts here 🚀</h1>
              <p>Make your app management easy and fun!</p>
            </div>
            {error && <div style={{color:'red',textAlign:'center',marginBottom:'1rem'}}>{error}</div>}
            {success && <div style={{color:'green',textAlign:'center',marginBottom:'1rem'}}>{success}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="internUsername">Full Name</label>
                <input
                  type="text"
                  id="internUsername"
                  name="internUsername"
                  value={formData.internUsername}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="internemail">Email</label>
                <input
                  type="email"
                  id="internemail"
                  name="internemail"
                  value={formData.internemail}
                  onChange={handleChange}
                  placeholder="john@example.com"
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="············"
                  required
                />
              </div>
              {/* You can add more fields as needed */}
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreeToTerms">
                    I agree to the Terms & Conditions
                  </label>
                </div>
              </div>
              <button type="submit" className="auth-button">
                Sign up
              </button>
              <div className="auth-footer">
                <p>
                  Already have an account? {' '}
                  <Link to="/login">Sign in instead</Link>
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

export default Register; 