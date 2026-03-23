import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import RatingSummary from '../components/RatingSummary';

function ProductList({ products = [], onAddToCart }) {
    const handleAddToCartClick = (event, product) => {
        event.preventDefault();
        event.stopPropagation();
        onAddToCart?.(product);
    };

    return (
        <Grid container spacing={3} padding={3}>
            {products?.length > 0 ? (
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, display: 'flex', flexDirection: 'column' }}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
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
                                    <RatingSummary ratings={product?.ratings} /> {}
                                    <Typography variant="subtitle1" fontWeight="bold" marginTop={1}>
                                        {product.price} kr
                                    </Typography>
                                </CardContent>
                            </Link>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={(event) => handleAddToCartClick(event, product)}
                                >
                                    Lägg i kundvagn
                                </Button>
                            </CardActions>
                        </Card>
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