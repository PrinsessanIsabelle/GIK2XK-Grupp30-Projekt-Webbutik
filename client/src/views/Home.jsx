import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import { useEffect, useState } from 'react';
import { getAll } from '../services/ProductService';
import { useCart } from '../context/CartContext';

function Home() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getAll().then((response) => {
            setProducts(response || []);
        });
    }, []);

    const handleAddToCart = async (product) => {
        await addToCart(product, 1);
    };

    return (
    <>  
        <h2>Whimsical Potions</h2>     
        <CategoryList />
        <ProductList products={products} onAddToCart={handleAddToCart} />
    </>
 );
};

export default Home;