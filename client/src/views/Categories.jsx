import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getByCategory } from '../services/ProductService';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';

function Categories() {
    const { name } = useParams();
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getByCategory(name).then((response) => setProducts(response || []));
    }, [name]);

    const handleAddToCart = async (product) => {
        await addToCart(product, 1);
    };

    return (
        <div>
            <h3>Kategori: {name}</h3>
            <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
    );
}
export default Categories;