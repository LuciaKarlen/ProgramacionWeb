import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeRecipeList from './pages/HomeRecipeList'; // Import the new component
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import AddTypeRecipe from './pages/AddTypeRecipe';
import AddIngredient from './pages/AddIngredient';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomeRecipeList />} /> {/* Use the new component */}
                <Route path="/receta/:id" element={<RecipeDetail />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} />
                <Route path="/add-type-recipe" element={<AddTypeRecipe />} />
                <Route path="/add-ingredient" element={<AddIngredient />} />
            </Routes>
        </Router>
    );
}

export default App;
