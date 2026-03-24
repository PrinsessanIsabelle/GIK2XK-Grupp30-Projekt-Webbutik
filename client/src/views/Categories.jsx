import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getByCategory } from '../services/ProductService';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';
import { Box, Typography } from '@mui/material';

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
        <Box>
            <Box sx={{ textAlign: 'center', mb: 3, }}>
                <Typography variant="h5" fontWeight="bold">
                    Kategori: {name}
                </Typography>
            </Box>
            <ProductList products={products} onAddToCart={handleAddToCart} />
        </Box>
    );
}
export default Categories;