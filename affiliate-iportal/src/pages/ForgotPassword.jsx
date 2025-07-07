import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
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
              <h1>Forgot Password? 🔒</h1>
              <p>
                {!isSubmitted 
                  ? "Enter your email and we'll send you instructions to reset your password"
                  : "Password reset instructions have been sent to your email"
                }
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <button type="submit" className="auth-button">
                  Send Reset Link
                </button>

                <div className="auth-footer">
                  <p>
                    <Link to="/login">
                      <span>←</span> Back to login
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <div className="auth-success">
                <p>Check your email for the instructions to reset your password.</p>
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="auth-button"
                  style={{ marginTop: '1rem' }}
                >
                  Try another email
                </button>
                <div className="auth-footer">
                  <p>
                    <Link to="/login">
                      <span>←</span> Back to login
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="activate-windows">
        Go to Settings to activate Windows.
      </div>
    </div>
  );
};

export default ForgotPassword; 