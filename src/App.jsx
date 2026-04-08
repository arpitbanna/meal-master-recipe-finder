import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchMeals('');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchMeals = (searchQuery) => {
    setLoading(true);
    setError(false);
    setSelectedMeal(null);
    setMeals([]);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (!data.meals) {
          setError(true);
          return;
        }
        setMeals(data.meals);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchMeals(query);
    }
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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const goBack = () => {
    setSelectedMeal(null);
  };

  const toggleFavorite = (meal) => {
    if (favorites.some(f => f.idMeal === meal.idMeal)) {
      setFavorites(favorites.filter(f => f.idMeal !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal]);
    }
  };

  const categories = Array.from(new Set(meals.map(meal => meal.strCategory))).filter(Boolean);

  let displayedMeals = meals.filter(meal => {
    const matchesSearch = meal.strMeal.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === '' || meal.strCategory === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || favorites.some(f => f.idMeal === meal.idMeal);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  if (sortOrder === 'asc') {
    displayedMeals = [...displayedMeals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  } else if (sortOrder === 'desc') {
    displayedMeals = [...displayedMeals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));
  }

  return (
    <>
      <div className="top-bar">
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1>Meal Master</h1>
      
      {!selectedMeal && (
        <div className="controls-section">
          <div className="filters-container">
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Search meals..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
            />
            <button id="searchButton" onClick={() => fetchMeals(query)}>Search</button>

            {meals.length > 0 && (
              <>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="default">Sort by Default</option>
                  <option value="asc">A-Z</option>
                  <option value="desc">Z-A</option>
                </select>

                <button 
                  className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                  {showFavoritesOnly ? '★ Showing Favorites' : '☆ Show Favorites'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {loading && <p id="loading">Loading...</p>}

      {!loading && error && !selectedMeal && <p>No meals found</p>}

      <div id="mealContainer" className={displayedMeals.length === 1 ? 'single-item' : ''}>
        {!loading && !selectedMeal && displayedMeals.length > 0 && displayedMeals.map(meal => (
          <div key={meal.idMeal} className="meal-card">
            <h3>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <p>{meal.strCategory}</p>
            <div className="action-buttons">
              <button className="view-btn" onClick={() => viewMeal(meal.idMeal)}>View Recipe</button>
              <button 
                className={`fav-btn ${favorites.some(f => f.idMeal === meal.idMeal) ? 'active' : ''}`}
                onClick={() => toggleFavorite(meal)}
              >
                {favorites.some(f => f.idMeal === meal.idMeal) ? '★ Favorited' : '☆ Favorite'}
              </button>
            </div>
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

      <footer className="app-footer">
        <p>Arpit singh pawar</p>
      </footer>
    </>
  );
}

export default App;
