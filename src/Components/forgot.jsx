import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Config';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const innerContainerStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#3d65f7',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const messageStyle = {
    marginTop: '20px',
    color: '#4caf50',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Forgot Password</h2>
        <form onSubmit={(e) => {e.preventDefault ; sendPasswordResetEmail(auth,  email)}} style={formStyle}>
          <label htmlFor="email" style={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Reset Password
          </button>

          {/* Display the button without linking it anywhere */}
          <Link to  = "/Login">
          <button type="button" style={{ textAlign: 'center', marginTop: '20px', color: '#333', textDecoration: 'none', cursor: 'pointer' }}>
            Back to Login
          </button>
          </Link>
        </form>

        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
