// src/components/Register.js
import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    const [genero, setGenero] = useState('');
    const [profesion, setProfesion] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    // Estados para el control de errores y campos tocados
    const [touched, setTouched] = useState({
        nombre: false,
        apellido: false,
        edad: false,
        correo: false,
        genero: false,
        profesion: false,
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        correo: '',
        genero: '',
        profesion: '',
    });

    // Expresión regular para validar el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expresión regular para validar solo letras (incluyendo acentos y espacios)
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Función para validar los campos
    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'nombre':
            case 'apellido':
            case 'profesion':
                if (!value.trim()) {
                    error = 'Este campo es requerido';
                } else if (!soloLetrasRegex.test(value.trim())) {
                    error = 'Este campo solo puede contener letras y espacios';
                }
                break;
            case 'edad':
                if (!value) {
                    error = 'Este campo es requerido';
                } else if (isNaN(value) || value <= 0) {
                    error = 'Ingrese una edad válida';
                }
                break;
            case 'correo':
                if (!value.trim()) {
                    error = 'Este campo es requerido';
                } else if (!emailRegex.test(value)) {
                    error = 'Ingrese un correo electrónico válido';
                }
                break;
            case 'genero':
                if (!value) {
                    error = 'Seleccione un género';
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
    };

    const handleInputChange = (setter, field, value) => {
        setter(value);
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, value);
    };

    useEffect(() => {
        // Verificar si hay errores
        const hasErrors = Object.values(errors).some((error) => error !== '');
        const allFieldsFilled = nombre && apellido && edad && correo && genero && profesion;

        if (allFieldsFilled && !hasErrors) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [nombre, apellido, edad, correo, genero, profesion, errors]);

    const handleRegister = async () => {
        console.log('Registrando usuario:', { nombre, apellido, edad, correo, genero, profesion });
    
        // Crear objeto con los datos del usuario
        const userData = {
            firstName: nombre,
            lastName: apellido,
            age: parseInt(edad),
            email: correo,
            gender: genero,
            profession: profesion,
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    onClose: () => navigate('/'), // Redirigir al cerrar el toast
                });
                // Limpiar los campos
                setNombre('');
                setApellido('');
                setEdad('');
                setCorreo('');
                setGenero('');
                setProfesion('');
                setTouched({
                    nombre: false,
                    apellido: false,
                    edad: false,
                    correo: false,
                    genero: false,
                    profesion: false,
                });
                setErrors({
                    nombre: '',
                    apellido: '',
                    edad: '',
                    correo: '',
                    genero: '',
                    profesion: '',
                });
                setIsButtonDisabled(true);
            } else {
                const errorData = await response.json();
                toast.error('Error al registrar el usuario: ' + errorData.error, {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            toast.error('Error en la solicitud: ' + error.message, {
                position: "top-center",
                autoClose: 5000,
            });
        }
    };    

    const getBorderStyle = (field) => {
        return touched[field] && errors[field] ? '1px solid red' : '1px solid #ccc';
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

            {/* Campo Nombre */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre" // Añadido el atributo name
                    value={nombre}
                    onChange={(e) => handleInputChange(setNombre, 'nombre', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, nombre: true }))}
                    style={{ border: getBorderStyle('nombre'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
                {touched.nombre && errors.nombre && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.nombre}</span>
                )}
            </div>

            {/* Campo Apellido */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Apellido</label>
                <input
                    type="text"
                    name="apellido" // Añadido el atributo name
                    value={apellido}
                    onChange={(e) => handleInputChange(setApellido, 'apellido', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, apellido: true }))}
                    style={{ border: getBorderStyle('apellido'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
                {touched.apellido && errors.apellido && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.apellido}</span>
                )}
            </div>

            {/* Campo Edad */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Edad</label>
                <input
                    type="number"
                    name="edad" // Añadido el atributo name
                    value={edad}
                    onChange={(e) => handleInputChange(setEdad, 'edad', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, edad: true }))}
                    style={{ border: getBorderStyle('edad'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
                {touched.edad && errors.edad && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.edad}</span>
                )}
            </div>

            {/* Campo Correo */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Correo</label>
                <input
                    type="email"
                    name="correo" // Añadido el atributo name
                    value={correo}
                    onChange={(e) => handleInputChange(setCorreo, 'correo', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, correo: true }))}
                    style={{ border: getBorderStyle('correo'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
                {touched.correo && errors.correo && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.correo}</span>
                )}
            </div>

            {/* Campo Género */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Género</label>
                <select
                    name="genero" // Añadido el atributo name
                    value={genero}
                    onChange={(e) => handleInputChange(setGenero, 'genero', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, genero: true }))}
                    style={{ border: getBorderStyle('genero'), padding: '10px', width: '100%', borderRadius: '5px' }}
                >
                    <option value="">Seleccione su género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                </select>
                {touched.genero && errors.genero && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.genero}</span>
                )}
            </div>

            {/* Campo Profesión */}
            <div className="form-group" style={{ marginBottom: '15px', width: '100%' }}>
                <label>Profesión</label>
                <input
                    type="text"
                    name="profesion" // Añadido el atributo name
                    value={profesion}
                    onChange={(e) => handleInputChange(setProfesion, 'profesion', e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, profesion: true }))}
                    style={{ border: getBorderStyle('profesion'), padding: '10px', width: '100%', borderRadius: '5px' }}
                />
                {touched.profesion && errors.profesion && (
                    <span className="error-message" style={{ color: 'red' }}>{errors.profesion}</span>
                )}
            </div>

            {/* Botón Registrar */}
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
