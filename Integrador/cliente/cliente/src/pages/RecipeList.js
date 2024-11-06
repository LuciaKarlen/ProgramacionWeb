import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchTitle, selectedIngredient, selectedRecipeType } = location.state;
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        let query = 'http://localhost:8000/api/recetas/?';
        if (searchTitle) query += `titulo=${searchTitle}&`;
        if (selectedIngredient) query += `ingrediente=${selectedIngredient}&`;
        if (selectedRecipeType) query += `tipo=${selectedRecipeType}&`;

        axios.get(query)
            .then(response => setRecipes(response.data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, [searchTitle, selectedIngredient, selectedRecipeType]);

    const handleRecipeClick = (id) => {
        navigate(`/receta/${id}`);
    };

    return (
        <div className="container">
            <h1 className="my-4">Resultados de la búsqueda</h1>
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

export default RecipeList;