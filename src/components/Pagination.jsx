import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button className="page-btn" disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}>Prev</button>

      <span className="page-info">{currentPage} of {totalPages}</span>

      <button className="page-btn" disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
