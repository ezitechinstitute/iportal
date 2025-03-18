import React, { useState } from 'react';
import './BirthdayWisher.css';

const BirthdayWisher = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Happy Birthday, ${name}! 🎉\n${message}`);
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      overflow: 'hidden',
      position: 'relative',
    },
    container: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      maxWidth: '450px',
      width: '100%',
      position: 'relative',
      zIndex: 2,
      animation: 'fadeIn 1s ease-in-out',
      border: '2px solid transparent',
      background: 'linear-gradient(45deg, #ff6f61, #ffd166) border-box',
      WebkitBackgroundClip: 'padding-box, border-box',
      backgroundClip: 'padding-box, border-box',
    },
    heading: {
      color: '#ff6f61',
      marginBottom: '20px',
      fontSize: '2.5rem',
      fontWeight: '600',
      background: 'linear-gradient(45deg, #ff6f61, #ffd166)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontWeight: '500',
      marginBottom: '10px',
      color: '#333',
      fontSize: '1.1rem',
    },
    input: {
      padding: '12px',
      marginBottom: '20px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#ff6f61',
    },
    textarea: {
      padding: '12px',
      marginBottom: '20px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      fontSize: '16px',
      resize: 'vertical',
      height: '120px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    textareaFocus: {
      borderColor: '#ff6f61',
    },
    button: {
      backgroundColor: '#ff6f61',
      color: 'white',
      padding: '14px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      fontWeight: '500',
    },
    buttonHover: {
      backgroundColor: '#ff4a3d',
      transform: 'scale(1.05)',
    },
  };

  // Balloon colors and positions
  const balloons = [
    { left: '10%', backgroundColor: '#ff6f61', animationDelay: '0s' },
    { left: '30%', backgroundColor: '#ffd166', animationDelay: '1s' },
    { left: '50%', backgroundColor: '#06d6a0', animationDelay: '2s' },
    { left: '70%', backgroundColor: '#118ab2', animationDelay: '3s' },
    { left: '90%', backgroundColor: '#ef476f', animationDelay: '4s' },
  ];

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Balloons */}
        {balloons.map((balloon, index) => (
          <div
            key={index}
            className="balloon"
            style={{
              left: balloon.left,
              backgroundColor: balloon.backgroundColor,
              animationDelay: balloon.animationDelay,
            }}
          >
            <div className="balloon-shine"></div>
            <div className="balloon-string"></div>
          </div>
        ))}

        {/* Birthday Card */}
        <div style={styles.card}>
          <h1 style={styles.heading}>🎂 Happy Birthday! 🎉</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="name" style={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter the birthday person's name"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#ff6f61')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              required
            />
            <label htmlFor="message" style={styles.label}>
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Write a birthday message..."
              style={styles.textarea}
              onFocus={(e) => (e.target.style.borderColor = '#ff6f61')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              required
            />
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff4a3d';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ff6f61';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Send Wishes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWisher;