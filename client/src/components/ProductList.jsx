import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import RatingSummary from '../components/RatingSummary';

function ProductList({ products = [], onAddToCart }) {
    const handleAddToCartClick = (event, product) => {
        event.preventDefault();
        event.stopPropagation();
        onAddToCart?.(product);
    };

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 2,
            width: '100%',
            p: 2
        }}>
            {products?.length > 0 ? (
                products.map((product) => (
                    <Card key={product.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageUrl}
                                alt={product.productName}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {product.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {product.description}
                                </Typography>
                                <RatingSummary ratings={product?.ratings} />
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
                ))
            ) : (
                <Typography sx={{ gridColumn: '1 / -1' }}>Kunde inte hitta produkt</Typography>
            )}
        </Box>
    );
}

export default ProductList;