import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/hornear.png';
import './Home.css'; // Import the CSS file

const HomeRecipeList = () => {
    const [ingredients, setIngredients] = useState([]);
    const [recipeTypes, setRecipeTypes] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedRecipeType, setSelectedRecipeType] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setIngredients(response.data))
            .catch(error => console.error('Error fetching ingredients:', error));

        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setRecipeTypes(response.data))
            .catch(error => console.error('Error fetching recipe types:', error));
    }, []);

    useEffect(() => {
        let query = 'http://localhost:8000/api/recetas/?';
        if (searchTitle) query += `titulo=${searchTitle}&`;
        if (selectedIngredient) query += `ingrediente=${selectedIngredient}&`;
        if (selectedRecipeType) query += `tipo=${selectedRecipeType}&`;

        axios.get(query)
            .then(response => {
                if (response.data.length === 0) {
                    setRecipes([]); // Clear recipes if no results found
                    setErrorMessage('No se encontraron recetas.');
                } else {
                    setRecipes(response.data);
                    setErrorMessage('');
                }
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                setErrorMessage('Error al cargar las recetas.');
                setRecipes([]); // Clear recipes on error
            });
    }, [searchTitle, selectedIngredient, selectedRecipeType]);

    const handleRecipeClick = (id) => {
        navigate(`/receta/${id}`);
    };

    return (
        <div className="container">
            <div className="text-center">
                <img src={logo} alt="Logo" className="logo my-4" />
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar por título"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                />
                            </div>
                            <div className="col">
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
                            <div className="col">
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
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="my-4">Resultados de la búsqueda</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="row">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="col-md-4">
                        <div className="card mb-4" onClick={() => handleRecipeClick(recipe.id)}>
                            <div className="card-body">
                                <h5 className="card-title">{recipe.titulo}</h5>
                                <p className="card-text">{recipe.descripcion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeRecipeList;