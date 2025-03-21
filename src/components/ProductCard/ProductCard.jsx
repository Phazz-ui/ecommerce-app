import React from 'react';
import './ProductCard.scss';

const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, category, image, description } = product;
  
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={image} alt={title} />
        <div className="product-card__category">{category}</div>
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__description">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        <div className="product-card__price">${Number(price).toFixed(2)}</div>
        <div className="product-card__actions">
          <button 
            className="btn" 
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 