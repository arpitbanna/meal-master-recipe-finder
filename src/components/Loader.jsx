import React from 'react';

function Loader({ type }) {
  if (type === 'skeleton') {
    return (
      <div className="grid-container">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-text" />
            <div className="skeleton-text sub" />
            <div className="skeleton-btn" />
          </div>
        ))}
      </div>
    );
  }

  // default spinner
  return (
    <div className="loader-container">
      <div className="spinner" />
    </div>
  );
}

export default Loader;
