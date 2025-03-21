import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList/ProductList';
import './styles/main.scss';
import './styles/App.scss';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      setCart(
        cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    console.log(`Added ${product.title} to cart`);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>E-commerce Shop</h1>
          <div className="cart-info">
            Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </div>
      </header>
      
      <main className="container">
        <ProductList products={products} onAddToCart={handleAddToCart} loading={loading} />
      </main>
      
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} E-commerce Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
