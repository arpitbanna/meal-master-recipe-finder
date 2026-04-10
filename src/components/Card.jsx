import React from 'react';

function Card({ meal, onCook, isFavorite, toggleFavorite }) {
  const isFav = isFavorite;

  return (
    <div className="card" onClick={() => onCook(meal.idMeal)}>
      <div className="card-image-wrapper">
        <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
      </div>

      <div className="card-overlay">
        {/* fav heart button */}
        <button
          className={`favorite-btn ${isFav ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); toggleFavorite(meal); }}
          aria-label="Toggle Favorite"
        >
          <svg className="heart-icon" viewBox="0 0 24 24"
            fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="card-text">
          <p className="card-category">{meal.strCategory} &bull; {meal.strArea || 'Global'}</p>
          <h3 className="card-title">{meal.strMeal}</h3>
          <button className="cook-btn" onClick={e => { e.stopPropagation(); onCook(meal.idMeal); }}>
            View Recipe
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
