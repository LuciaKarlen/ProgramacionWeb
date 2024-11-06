// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/hornear.png';
import './Home.css'; // Import the CSS file

const Home = () => {
    const [ingredients, setIngredients] = useState([]);
    const [recipeTypes, setRecipeTypes] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedRecipeType, setSelectedRecipeType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setIngredients(response.data))
            .catch(error => console.error('Error fetching ingredients:', error));

        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setRecipeTypes(response.data))
            .catch(error => console.error('Error fetching recipe types:', error));
    }, []);

    const handleSearch = () => {
        navigate('/recipe-list', {
            state: {
                searchTitle,
                selectedIngredient,
                selectedRecipeType
            }
        });
    };

    return (
        <div className="container text-center">
            <img src={logo} alt="Logo" className="logo my-4" />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por título"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <select
                            className="form-control"
                            value={selectedIngredient}
                            onChange={(e) => setSelectedIngredient(e.target.value)}
                        >
                            <option value="">Todos los ingredientes</option>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.id}>{ingredient.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select
                            className="form-control"
                            value={selectedRecipeType}
                            onChange={(e) => setSelectedRecipeType(e.target.value)}
                        >
                            <option value="">Todos los tipos de receta</option>
                            {recipeTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    );
};

export default Home;