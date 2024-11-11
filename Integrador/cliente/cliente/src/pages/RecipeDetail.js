import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [recipeType, setRecipeType] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recetas/${id}/`)
            .then(response => {
                setRecipe(response.data);
                return axios.get(`http://localhost:8000/api/tipos/${response.data.tipo}/`);
            })
            .then(response => setRecipeType(response.data.nombre))
            .catch(error => console.error('Error fetching recipe:', error));

        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setIngredients(response.data))
            .catch(error => console.error('Error loading ingredients:', error));
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/recetas/${id}/`)
            .then(response => {
                console.log('Recipe deleted:', response.data);
                navigate('/');
            })
            .catch(error => console.error('Error deleting recipe:', error));
    };

    const handleEdit = () => {
        navigate(`/edit-recipe/${id}`);
    };

    if (!recipe) return <div>Loading...</div>;

    const getIngredientName = (id) => {
        const ingredient = ingredients.find(ing => ing.id === id);
        return ingredient ? ingredient.nombre : id;
    };

    return (
        <div className="container">
            <h1 className="my-4">{recipe.titulo}</h1>
            <p><strong>Descripción:</strong> {recipe.descripcion}</p>
            <p><strong>Tiempo:</strong> {recipe.tiempo} minutos</p>
            <p><strong>Tipo:</strong> {recipeType}</p>
            <h4>Ingredientes</h4>
            <ul>
                {recipe.recetaingredientes.map((ing, index) => (
                    <li key={index}>{ing.cantidad} - {getIngredientName(ing.ingrediente)}</li>
                ))}
            </ul>
            <h4>Pasos</h4>
            <p>{recipe.pasos}</p>
            <button className="btn btn-primary mt-3" onClick={handleEdit}>Editar</button>
            <button className="btn btn-danger mt-3 ml-2" onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default RecipeDetail;