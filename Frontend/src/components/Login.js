import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for handling regular login
    console.log('Logging in with email:', email);
  };

  const handleRegister = () => {
    // Logic for handling registration
    console.log('Registering with email:', email);
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response.profileObj);
    // Logic for handling Google login success
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <div className="google-login">
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default Login;
