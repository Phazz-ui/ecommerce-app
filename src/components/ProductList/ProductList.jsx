import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import './ProductList.scss';

const ProductList = ({ products, onAddToCart, loading }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(['all']);
  const productsPerPage = 8;
  
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = ['all', ...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);
  
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = products.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, products]);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (loading) {
    return (
      <div className="product-list">
        <Loader message="Loading products..." />
      </div>
    );
  }
  
  return (
    <div className="product-list">
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="product-list__header">
        <h1 className="product-list__title">Products</h1>
        <div className="product-list__results">
          Showing {currentProducts.length} of {filteredProducts.length} products
        </div>
      </div>
      
      {currentProducts.length > 0 ? (
        <>
          <div className="product-list__grid">
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="product-list__empty">
          <h3>No products found</h3>
          <p>Try selecting a different category</p>
          <button 
            className="btn"
            onClick={() => setSelectedCategory('all')}
          >
            Show all products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList; 