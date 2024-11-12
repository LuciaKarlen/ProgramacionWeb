import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('');
    const [ingredientes, setIngredientes] = useState([{ ingrediente: '', cantidad: '' }]);
    const [pasos, setPasos] = useState('');
    const [tipos, setTipos] = useState([]);
    const [listaIngredientes, setListaIngredientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setTipos(response.data))
            .catch(error => console.error('Error loading recipe types:', error));

        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setListaIngredientes(response.data))
            .catch(error => console.error('Error loading ingredients:', error));
    }, []);

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredientes];
        newIngredients[index][field] = value;
        setIngredientes(newIngredients);
    };

    const addIngredient = () => {
        setIngredientes([...ingredientes, { ingrediente: '', cantidad: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const recetaData = {
            titulo,
            descripcion,
            tiempo: parseInt(tiempo),
            tipo,
            recetaingredientes: ingredientes,
            pasos
        };

        axios.post('http://localhost:8000/api/recetas/', recetaData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                navigate(`/receta/${response.data.id}`);
            })
            .catch(error => console.error('Error creating recipe:', error));
    };

    return (
        <div className="container">
            <h1 className="my-4">Agregar Receta</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Tiempo (en minutos)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Receta</label>
                    <select
                        className="form-control"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="">Seleccione el tipo de receta</option>
                        {tipos.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Ingredientes</label>
                    {ingredientes.map((ing, index) => (
                        <div key={index} className="d-flex mb-2">
                            <select
                                className="form-control mr-2"
                                value={ing.ingrediente}
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
                                value={ing.cantidad}
                                onChange={(e) => handleIngredientChange(index, 'cantidad', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={addIngredient}>Agregar Ingrediente</button>
                </div>
                <div className="form-group">
                    <label>Pasos</label>
                    <textarea
                        className="form-control"
                        value={pasos}
                        onChange={(e) => setPasos(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Agregar Receta</button>
            </form>
        </div>
    );
};

export default CreateRecipe;