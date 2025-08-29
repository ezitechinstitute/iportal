'use client';

import axios from 'axios';
import { useState } from 'react';
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGithub,
  FaLock,
  FaTwitter,
  FaUser,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './style/login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInput = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleLogin = async e => {
    e.preventDefault();

    if (!value.email || !value.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields first!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.post(
        'https://api.ezitech.org/manager-auth',
        
        value
      );
     

      if (res.data.isLoggedIn === true) {
        const { user, token } = res.data;
        sessionStorage.setItem('managerid', user.manager_id);
        sessionStorage.setItem('etiid', user.eti_id);
        sessionStorage.setItem('username', user.name);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', 'Manager');
        sessionStorage.setItem('contact', user.contact);
        sessionStorage.setItem('isLoggedIn', 'true');

        setMessage({
          type: 'success',
          text: 'Login Successful! Redirecting...',
        });

        setTimeout(() => {
          navigate('/manager-dashboard');
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: res.data.message || 'Invalid User!',
        });
      }
    } catch (err) {
      console.error('API Error:', err.response?.data || err.message);
      const errorMsg =
        err.response?.data?.error || 'Login failed. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='main-content'>
          {/* Left Side - Dark with illustration and Welcome Back */}
          <div className='left-side'>
            <div className='illustration-container'>
              <img
                className='login-illustration'
                src='../../../app-assets/images/pages/login-v2.svg'
                alt='Login Illustration'
              />
            </div>
            <div className='welcome-text'>
              <h1>Welcome Back!</h1>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className='right-side'>
            <div className='form-container'>
              <div className='logo-container'>
                <img src='./images/logo.png' alt='Logo' width={150} />
              </div>
              <h2 className='form-title'>Log in</h2>

              {message.text && (
                <div className={`message ${message.type}`}>{message.text}</div>
              )}

              <form className='login-form' onSubmit={handleLogin}>
                <div className='input-group'>
                  <FaUser className='input-icon' />
                  <input
                    type='email'
                    name='email'
                    value={value.email}
                    onChange={handleInput}
                    placeholder='Username'
                    className='form-input'
                    disabled={loading}
                    required
                  />
                </div>

                <div className='input-group'>
                  <FaLock className='input-icon' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={value.password}
                    onChange={handleInput}
                    placeholder='Password'
                    className='form-input'
                    disabled={loading}
                    required
                  />
                  <button
                    type='button'
                    className='password-toggle'
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className='form-options'>
                  <label className='remember-checkbox'>
                    <input type='checkbox' disabled={loading} />
                    <span className='checkmark'></span>
                    Remember Me
                  </label>
                  <button
                    type='button'
                    className='forgot-link'
                    data-toggle='modal'
                    data-target='#exampleModalCenter'
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type='submit' className='login-btn' disabled={loading}>
                  {loading ? (
                    <>
                      <div className='spinner'></div>
                      Logging in...
                    </>
                  ) : (
                    'Log in'
                  )}
                </button>

                <div className='divider'>
                  <span>Or</span>
                </div>

                {/* <Link to='/signup' className='signup-btn'>
                  Sign up
                </Link> */}
              </form>

              <div className='social-login'>
                <Link href='#' className='social-btn facebook'>
                  <FaFacebookF />
                </Link>
                <Link href='#' className='social-btn twitter'>
                  <FaTwitter />
                </Link>
                <Link href='#' className='social-btn google'>
                  <FaEnvelope />
                </Link>
                <Link href='#' className='social-btn github'>
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className='modal fade'
        id='exampleModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Forgot Password
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <input
                className='form-control'
                type='email'
                name='email'
                placeholder='Email'
              />
              <br />
              <input
                className='form-control'
                type='password'
                name='password'
                placeholder='New Password'
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
