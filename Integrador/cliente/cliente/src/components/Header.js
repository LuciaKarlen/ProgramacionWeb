// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Mis Recetas</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-recipe">Crear Receta</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-type-recipe">Tipos de Receta</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-ingredient">Ingredientes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;