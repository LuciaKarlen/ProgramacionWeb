import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import './Home.css'; // Import the CSS file

const AddTypeRecipe = () => {
    const [nombre, setNombre] = useState('');
    const [tipos, setTipos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTipos();
    }, []);

    const fetchTipos = () => {
        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setTipos(response.data))
            .catch(error => console.error('Error fetching recipe types:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/tipos/', { nombre })
            .then(response => {
                setNombre('');
                fetchTipos();
            })
            .catch(error => console.error('Error creating recipe type:', error));
    };

    const handleEdit = (id, newName) => {
        axios.put(`http://localhost:8000/api/tipos/${id}/`, { nombre: newName })
            .then(response => fetchTipos())
            .catch(error => console.error('Error updating recipe type:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/tipos/${id}/`)
            .then(response => fetchTipos())
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage('No se puede eliminar porque está asociado a una receta.');
                } else {
                    console.error('Error deleting recipe type:', error);
                }
                setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
            });
    };

    return (
        <div className="container">
            <h1 className="my-4">Agregar Tipo de Receta</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Agregar</button>
            </form>
            {errorMessage && <div className="error-message mt-3">{errorMessage}</div>}
            <h2 className="my-4">Tipos de Recetas</h2>
            <ul className="list-group">
                {tipos.map(tipo => (
                    <li key={tipo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={tipo.nombre}
                            onChange={(e) => handleEdit(tipo.id, e.target.value)}
                        />
                        <FaTrash className="text-danger ml-2" onClick={() => handleDelete(tipo.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddTypeRecipe;