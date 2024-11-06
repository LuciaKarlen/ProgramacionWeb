import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Import the CSS file

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        titulo: '',
        descripcion: '',
        tiempo: '',
        tipo: '',
        recetaingredientes: []
    });
    const [tipos, setTipos] = useState([]);
    const [listaIngredientes, setListaIngredientes] = useState([]);

    useEffect(() => {
        // Fetch recipe details
        axios.get(`http://localhost:8000/api/recetas/${id}/`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe:', error));

        // Fetch recipe types
        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setTipos(response.data))
            .catch(error => console.error('Error loading recipe types:', error));

        // Fetch ingredients
        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setListaIngredientes(response.data))
            .catch(error => console.error('Error loading ingredients:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...recipe.recetaingredientes];
        updatedIngredients[index][field] = value;
        setRecipe({ ...recipe, recetaingredientes: updatedIngredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, recetaingredientes: [...recipe.recetaingredientes, { ingrediente: '', cantidad: '' }] });
    };

    const handleSave = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/recetas/${id}/`, recipe)
            .then(response => {
                console.log('Recipe updated:', response.data);
                navigate('/'); // Navigate back or to the desired location
            })
            .catch(error => console.error('Error updating recipe:', error));
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/recetas/${id}/`)
            .then(response => {
                console.log('Recipe deleted:', response.data);
                navigate('/'); // Navigate back or to the desired location
            })
            .catch(error => console.error('Error deleting recipe:', error));
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1 className="my-4">Edit Recipe</h1>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        value={recipe.titulo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        className="form-control"
                        name="descripcion"
                        value={recipe.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Tiempo (minutos)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="tiempo"
                        value={recipe.tiempo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Receta</label>
                    <select
                        className="form-control"
                        name="tipo"
                        value={recipe.tipo}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccionar tipo</option>
                        {tipos.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>
                <h4>Ingredientes</h4>
                {recipe.recetaingredientes && recipe.recetaingredientes.map((ingredient, index) => (
                    <div key={index} className="d-flex mb-2">
                        <select
                            className="form-control mr-2"
                            value={ingredient.ingrediente}
                            onChange={(e) => handleIngredientChange(index, 'ingrediente', e.target.value)}
                            required
                        >
                            <option value="">Seleccione un ingrediente</option>
                            {listaIngredientes.map(ingr => (
                                <option key={ingr.id} value={ingr.id}>{ingr.nombre}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cantidad"
                            value={ingredient.cantidad}
                            onChange={(e) => handleIngredientChange(index, 'cantidad', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mt-2" onClick={addIngredient}>Agregar Ingrediente</button>
                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                <button type="button" className="btn btn-danger mt-3 ml-2" onClick={handleDelete}>Eliminar</button>
            </form>
        </div>
    );
};

export default RecipeDetail;
