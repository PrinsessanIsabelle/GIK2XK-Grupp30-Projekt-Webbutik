import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import { useEffect, useState } from 'react';
import { getAll } from '../services/ProductService';

function Home() {
    const [products, setProducts] = useState([]);
useEffect(() => {
    getAll().then((response) => {
        setProducts(response || [])});
    }, []);
    return (
    <>  
        <h2>Get fucked up - Drinks CO</h2>     
        <CategoryList />
        <ProductList products={products} />
    </>
 );
};

export default Home;