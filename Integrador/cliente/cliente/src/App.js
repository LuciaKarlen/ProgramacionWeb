import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe'; // Import the new component
import AddTypeRecipe from './pages/AddTypeRecipe';
import AddIngredient from './pages/AddIngredient';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe-list" element={<RecipeList />} />
                <Route path="/receta/:id" element={<RecipeDetail />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} /> {/* Add the new route */}
                <Route path="/add-type-recipe" element={<AddTypeRecipe />} />
                <Route path="/add-ingredient" element={<AddIngredient />} />
            </Routes>
        </Router>
    );
}

export default App;
