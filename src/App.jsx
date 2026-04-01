import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchMeals = () => {
    if (!query) return;
    setLoading(true);
    setError(false);
    setSelectedMeal(null);
    setMeals([]);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (!data.meals) {
          setError(true);
          return;
        }
        setMeals(data.meals);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  };

  const viewMeal = (id) => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.meals) {
          setSelectedMeal(data.meals[0]);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  };

  const goBack = () => {
    setSelectedMeal(null);
  };

  return (
    <>
      <h1>Meal Master</h1>
      
      {!selectedMeal && (
        <div className="search-container">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Search meals..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMeals()}
          />
          <button id="searchButton" onClick={searchMeals}>Search</button>
        </div>
      )}

      {loading && <p id="loading">Loading...</p>}

      {!loading && error && !selectedMeal && <p>No meals found</p>}

      <div id="mealContainer">
        {!loading && !selectedMeal && meals.length > 0 && meals.map(meal => (
          <div key={meal.idMeal}>
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strCategory}</p>
            <button className="view-btn" onClick={() => viewMeal(meal.idMeal)}>View Recipe</button>
          </div>
        ))}

        {!loading && selectedMeal && (
          <div className="recipe-view">
            <h2>{selectedMeal.strMeal}</h2>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
            <p>{selectedMeal.strInstructions}</p>
            <button className="back-btn" onClick={goBack}>Back</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
