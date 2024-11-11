import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('');
    const [ingredientes, setIngredientes] = useState([{ ingrediente: '', cantidad: '' }]);
    const [pasos, setPasos] = useState('');
    const [tipos, setTipos] = useState([]);
    const [listaIngredientes, setListaIngredientes] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/recetas/${id}/`)
            .then(response => {
                const receta = response.data;
                setTitulo(receta.titulo);
                setDescripcion(receta.descripcion);
                setTiempo(receta.tiempo);
                setTipo(receta.tipo);
                setIngredientes(receta.recetaingredientes);
                setPasos(receta.pasos);
            })
            .catch(error => console.error('Error fetching recipe:', error));

        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setTipos(response.data))
            .catch(error => console.error('Error loading recipe types:', error));

        axios.get('http://localhost:8000/api/ingredientes/')
            .then(response => setListaIngredientes(response.data))
            .catch(error => console.error('Error loading ingredients:', error));
    }, [id]);

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

        axios.put(`http://localhost:8000/api/recetas/${id}/`, recetaData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSuccessMessage('Receta actualizada exitosamente.');
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    navigate(`/receta/${id}`);
                }, 3000);
            })
            .catch(error => console.error('Error updating recipe:', error));
    };

    return (
        <div className="container">
            <h1 className="my-4">Editar Receta</h1>
            {showSuccessMessage && <div style={{ color: '#493628', marginTop: '10px' }}>{successMessage}</div>}
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
                            <input
                                type="text"
                                className="form-control mr-2"
                                placeholder="Cantidad"
                                value={ing.cantidad}
                                onChange={(e) => handleIngredientChange(index, 'cantidad', e.target.value)}
                                required
                            />
                            <select
                                className="form-control"
                                value={ing.ingrediente}
                                onChange={(e) => handleIngredientChange(index, 'ingrediente', e.target.value)}
                                required
                            >
                                <option value="">Seleccione un ingrediente</option>
                                {listaIngredientes.map(ingr => (
                                    <option key={ingr.id} value={ingr.id}>{ingr.nombre}</option>
                                ))}
                            </select>
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
                <button type="submit" className="btn btn-primary mt-3">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditRecipe;