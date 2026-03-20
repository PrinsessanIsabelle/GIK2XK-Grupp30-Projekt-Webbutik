import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getByCategory } from '../services/ProductService';
import ProductList from '../components/ProductList';

function Categories() {
    const { name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getByCategory(name).then((response) => setProducts(response || []));
    }, [name]);

    return (
        <div>
            <h3>Kategori: {name}</h3>
            <ProductList products={products} />
        </div>
    );
}
export default Categories;