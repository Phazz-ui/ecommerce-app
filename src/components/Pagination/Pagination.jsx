import React from 'react';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className={`pagination__item ${currentPage === 1 ? 'pagination__item--disabled' : ''}`}>
          <button 
            className="pagination__button" 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
        </li>
        
        {pages.map(page => (
          <li 
            key={page} 
            className={`pagination__item ${currentPage === page ? 'pagination__item--active' : ''}`}
          >
            <button 
              className="pagination__button" 
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        
        <li className={`pagination__item ${currentPage === totalPages ? 'pagination__item--disabled' : ''}`}>
          <button 
            className="pagination__button" 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 