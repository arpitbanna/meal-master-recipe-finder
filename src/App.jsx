import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Loader from './components/Loader';
import { getMeals, getMealById } from './utils/api';
import { debounce } from './utils/debounce';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';

const PER_PAGE = 12;

function App() {
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [category, setCategory] = useState('');
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [visible, setVisible] = useState(PER_PAGE);

  const [favorites, setFavorites] = useLocalStorage('mealMaster_favorites', []);
  const [darkMode, setDarkMode] = useLocalStorage('mealMaster_theme', false);

  const scrollRef = useRef(null);

  // dark mode toggle
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // fetch meals from API
  async function loadMeals(q) {
    setLoading(true);
    setError(null);
    setSelectedMeal(null);
    setVisible(PER_PAGE);
    try {
      const data = await getMeals(q);
      setMeals(data);
      if (data.length === 0) setError('No meals found');
    } catch {
      setError('Something went wrong while fetching meals');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadMeals(''); }, []);

  // debounced version so we don't spam the API on every keystroke
  const debouncedLoad = useCallback(debounce(val => loadMeals(val), 400), []);

  function toggleFav(meal) {
    setFavorites(prev => {
      if (prev.some(f => f.idMeal === meal.idMeal)) {
        return prev.filter(f => f.idMeal !== meal.idMeal);
      }
      return [...prev, meal];
    });
  }

  async function openRecipe(id) {
    setLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const meal = await getMealById(id);
      setSelectedMeal(meal);
    } catch {
      setError('Could not load recipe details.');
    } finally {
      setLoading(false);
    }
  }

  // get unique categories from current results
  const categories = useMemo(() =>
    [...new Set(meals.map(m => m.strCategory))].filter(Boolean),
    [meals]
  );

  // filtering logic
  const filtered = meals.filter(m => {
    if (category && m.strCategory !== category) return false;
    if (showFavOnly && !favorites.some(f => f.idMeal === m.idMeal)) return false;
    return true;
  });

  const shown = filtered.slice(0, visible);

  // infinite scroll with IntersectionObserver
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && visible < filtered.length) {
        setVisible(v => v + 4);
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [visible, filtered.length]);

  return (
    <div className="app">
      <Navbar
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        onSearch={setQuery}
        debounceSearch={debouncedLoad}
      />

      <main className="main-content">

        {/* filters bar - only when browsing */}
        {!selectedMeal && (
          <div className="controls-panel fade-in">
            <div className="filters">
              <select value={category} onChange={e => { setCategory(e.target.value); setVisible(PER_PAGE); }}
                className="custom-select">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="toggles">
              <button
                className={`btn toggle-btn ${showFavOnly ? 'active' : ''}`}
                onClick={() => { setShowFavOnly(!showFavOnly); setVisible(PER_PAGE); }}
              >
                {showFavOnly ? '★ Showing Favorites' : '☆ View Favorites'}
              </button>
            </div>
          </div>
        )}

        {loading && !selectedMeal && <Loader type="skeleton" />}

        {/* error state */}
        {error && !loading && (
          <div className="state-container fade-in">
            <svg className="state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="state-title">Oops! Nothing found</h2>
            <p className="state-desc">
              {error === 'No meals found'
                ? "We couldn't find any recipes matching your criteria. Try a different search."
                : error}
            </p>
            <button className="btn retry-btn" onClick={() => { setQuery(''); loadMeals(''); }}>
              Reset Search
            </button>
          </div>
        )}

        {/* empty favorites */}
        {!loading && !error && !selectedMeal && filtered.length === 0 && (
          <div className="state-container fade-in">
            <svg className="state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="state-title">Your list is empty</h2>
            <p className="state-desc">You haven't added any favorites yet. Go explore and heart some tasty meals!</p>
          </div>
        )}

        {/* meal cards grid */}
        {!loading && !error && !selectedMeal && shown.length > 0 && (
          <div className="grid-container">
            {shown.map((meal, i) => (
              <div key={meal.idMeal} className="card-appear" style={{ animationDelay: `${i * 0.05}s` }}>
                <Card
                  meal={meal}
                  onCook={openRecipe}
                  isFavorite={favorites.some(f => f.idMeal === meal.idMeal)}
                  toggleFavorite={toggleFav}
                />
              </div>
            ))}
          </div>
        )}

        {/* infinite scroll sentinel */}
        {!selectedMeal && filtered.length > visible && (
          <div ref={scrollRef} style={{ height: 80 }}>
            <Loader type="spinner" />
          </div>
        )}

        {/* recipe detail view */}
        {selectedMeal && (
          <div className="recipe-details fade-in">
            <button className="btn back-btn" onClick={() => setSelectedMeal(null)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Explore
            </button>
            <div className="recipe-header">
              <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
              <div className="recipe-info">
                <h2>{selectedMeal.strMeal}</h2>
                <div className="tags">
                  <span className="tag">{selectedMeal.strCategory}</span>
                  <span className="tag">{selectedMeal.strArea}</span>
                </div>
              </div>
            </div>
            <div className="recipe-instructions">
              <h3>Preparation Instructions</h3>
              <p>{selectedMeal.strInstructions}</p>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MealMaster Pro. Designed for excellence.</p>
      </footer>
    </div>
  );
}

export default App;
