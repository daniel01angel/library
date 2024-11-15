// src/components/Register.js
import React, { useState, useEffect } from 'react';
import '../styles/Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // El botón empieza habilitado

    // Estado para almacenar si el campo fue tocado sin ingresar un valor
    const [touched, setTouched] = useState({
        nombre: false,
        apellido: false,
        ciudad: false,
        pais: false,
        edad: false,
        correo: false,
    });

    // Función para manejar el cambio en los campos y deshabilitar el botón al comenzar a escribir
    const handleInputChange = (setter, field, value) => {
        setter(value);
        setTouched((prev) => ({ ...prev, [field]: true })); // Marcar el campo como tocado
        if (!isButtonDisabled) {
            setIsButtonDisabled(true); // Deshabilita el botón al primer cambio en los campos
        }
    };

    // Validar si todos los campos están completos para volver a habilitar el botón
    useEffect(() => {
        if (nombre && apellido && ciudad && pais && edad && correo) {
            setIsButtonDisabled(false); // Habilita el botón si todos los campos están completos
        }
    }, [nombre, apellido, ciudad, pais, edad, correo]);

    const handleRegister = () => {
        // Aquí iría la lógica para registrar al usuario
        console.log('Registrando usuario:', { nombre, apellido, ciudad, pais, edad, correo });
    };

    // Estilo de borde rojo para campos vacíos y tocados
    const getBorderStyle = (field) => {
        return touched[field] && !eval(field) ? '1px solid red' : '1px solid #ccc';
    };

    return (
        <div className="register-container" style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Registro</h2>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => handleInputChange(setNombre, 'nombre', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, nombre: true }))}
                    style={{ border: getBorderStyle('nombre'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Apellido</label>
                <input
                    type="text"
                    value={apellido}
                    onChange={(e) => handleInputChange(setApellido, 'apellido', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, apellido: true }))}
                    style={{ border: getBorderStyle('apellido'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Ciudad</label>
                <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => handleInputChange(setCiudad, 'ciudad', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, ciudad: true }))}
                    style={{ border: getBorderStyle('ciudad'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>País</label>
                <input
                    type="text"
                    value={pais}
                    onChange={(e) => handleInputChange(setPais, 'pais', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, pais: true }))}
                    style={{ border: getBorderStyle('pais'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Edad</label>
                <input
                    type="number"
                    value={edad}
                    onChange={(e) => handleInputChange(setEdad, 'edad', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, edad: true }))}
                    style={{ border: getBorderStyle('edad'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Correo</label>
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => handleInputChange(setCorreo, 'correo', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, correo: true }))}
                    style={{ border: getBorderStyle('correo'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
            </div>
            <button
                onClick={handleRegister}
                disabled={isButtonDisabled}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: isButtonDisabled ? '#ccc' : '#28a745',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s'
                }}
            >
                Registrar
            </button>
        </div>
    );
};

export default Register;
