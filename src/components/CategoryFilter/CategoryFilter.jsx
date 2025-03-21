import React from 'react';
import './CategoryFilter.scss';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h2 className="category-filter__title">Filter by Category</h2>
      <ul className="category-filter__list">
        {categories.map((category) => (
          <li 
            key={category} 
            className={`category-filter__item ${selectedCategory === category ? 'category-filter__item--active' : ''}`}
          >
            <button
              className="category-filter__button"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter; 