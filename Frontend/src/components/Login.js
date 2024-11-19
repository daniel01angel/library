import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Manejo del login con email y contraseña
  const handleLogin = async () => {
    if (email && password) {
      try {
        // Hacer la petición al backend para validar las credenciales
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Si la respuesta es exitosa
          const data = await response.json();
          console.log('Login exitoso:', data);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          // Si no existe el usuario o la contraseña es incorrecta
          setErrorMessage('El usuario no existe o la contraseña es incorrecta.');
        }
      } catch (error) {
        console.error('Error en el login:', error);
        setErrorMessage('Error al conectar con el servidor. Inténtelo de nuevo.');
      }
    } else {
      setErrorMessage('Por favor, ingrese tanto el correo electrónico como la contraseña.');
    }
  };

  // Manejo del registro
  const handleRegister = () => {
    navigate('/register');
  };

  // Manejo del login exitoso con Google
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; // JWT que devuelve Google

      // Envía el token al backend
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Google login successful:', data);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setErrorMessage('Failed to authenticate with the server.');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      setErrorMessage('Google login failed. Please try again.');
    }
  };

  // Manejo del login fallido con Google
  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="290181437692-sbvs25klnskordo26alc69igj5gg4uc4.apps.googleusercontent.com">
      <div className="login-container" style={{ 
          maxWidth: '400px', 
          margin: '50px auto', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh'
        }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Login</h2>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>
        )}
        {/* Formulario de login */}
        <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>
        {/* Botones de Login y Registro */}
        <button 
          data-testid="login-button"
          onClick={handleLogin} 
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Login
        </button>
        <button 
          onClick={handleRegister} 
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#28a745',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Register
        </button>
        {/* Botón de Google Login */}
        <div className="google-login" style={{ textAlign: 'center', marginTop: '10px' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
