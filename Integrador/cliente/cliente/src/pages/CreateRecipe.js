import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddRecipe = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [tipo, setTipo] = useState('');
    const [ingredientes, setIngredientes] = useState([{ ingrediente: '', cantidad: '' }]);
    const [tipos, setTipos] = useState([]);
    const [listaIngredientes, setListaIngredientes] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Cargar tipos de receta
        axios.get('http://localhost:8000/api/tipos/')
            .then(response => setTipos(response.data))
            .catch(error => console.error('Error loading recipe types:', error));

        // Cargar ingredientes
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
            recetaingredientes: ingredientes
        };

        axios.post('http://localhost:8000/api/recetas/', recetaData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSuccessMessage('Receta creada exitosamente.');
                setShowSuccessMessage(true);
                setTitulo('');
                setDescripcion('');
                setTiempo('');
                setTipo('');
                setIngredientes([{ ingrediente: '', cantidad: '' }]);
                setTimeout(() => setShowSuccessMessage(false), 3000); // Ocultar después de 3 segundos
            })
            .catch(error => console.error('Error creating recipe:', error));
    };

    return (
        <div className="container">
            <h1 className="my-4">Agregar Receta</h1>
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
                <button type="submit" className="btn btn-primary mt-3">Agregar Receta</button>
            </form>
        </div>
    );
};

export default AddRecipe;