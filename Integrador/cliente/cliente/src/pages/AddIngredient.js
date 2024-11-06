import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddIngredient = () => {
    const [nombre, setNombre] = useState('');
    const [ingredientes, setIngredientes] = useState([]);

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
                console.log('Ingredient created:', response.data);
                setNombre('');
                fetchIngredientes();
            })
            .catch(error => console.error('Error creating ingredient:', error));
    };

    const handleEdit = (id, newName) => {
        axios.put(`http://localhost:8000/api/ingredientes/${id}/`, { nombre: newName })
            .then(response => {
                console.log('Ingredient updated:', response.data);
                fetchIngredientes();
            })
            .catch(error => console.error('Error updating ingredient:', error));
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddIngredient;