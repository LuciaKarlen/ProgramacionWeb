import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';
import './Home.css'; // Import the CSS file

const AddIngredient = () => {
    const [nombre, setNombre] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchIngredientes();
    }, []);

    const fetchIngredientes = () => {
        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setIngredientes(response.data))
            .catch(error => console.error('Error fetching ingredients:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/ingredientes/', { nombre })
            .then(response => {
                setNombre('');
                fetchIngredientes();
            })
            .catch(error => console.error('Error creating ingredient:', error));
    };

    const handleEdit = (id, newName) => {
        axios.put(`http://localhost:8000/api/ingredientes/${id}/`, { nombre: newName })
            .then(response => fetchIngredientes())
            .catch(error => console.error('Error updating ingredient:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/ingredientes/${id}/`)
            .then(response => fetchIngredientes())
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage('No se puede eliminar porque está asociado a una receta.');
                } else {
                    console.error('Error deleting ingredient:', error);
                }
                setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
            });
    };

    return (
        <div className="container">
            <h1 className="my-4">Agregar Ingrediente</h1>
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
            <h2 className="my-4">Ingredientes</h2>
            <ul className="list-group">
                {ingredientes.map(ing => (
                    <li key={ing.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={ing.nombre}
                            onChange={(e) => handleEdit(ing.id, e.target.value)}
                        />
                        <FaTrash className="text-danger ml-2" onClick={() => handleDelete(ing.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddIngredient;