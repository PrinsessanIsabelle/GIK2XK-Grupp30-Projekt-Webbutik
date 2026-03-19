import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getAll } from '../services/ProductService'
import { useEffect, useState } from 'react';

function ProductList({pathname}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAll(pathname).then(products => {
            setProducts(products);
        });
    }, [pathname]);

    return (
        <Grid container spacing={3} padding={3}>
            {products?.length > 0 ? (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.imageUrl}
                                    alt={product.productName}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {product.price} kr
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <h3>Kunde inte hitta produkt</h3>
                </Grid>
            )}
        </Grid>
    );
}
export default ProductList;