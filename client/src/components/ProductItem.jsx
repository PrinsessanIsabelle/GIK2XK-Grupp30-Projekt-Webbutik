import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RatingSummary from '../components/RatingSummary';

// Produktkort för listvyer. Visar produktbild, namn, pris och genomsnittsbetyg. Klickbar för att se detaljer
function ProductItem({ product }) {
    return (
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
                    <RatingSummary ratings={product?.ratings} />
                    <Typography variant="subtitle1" fontWeight="bold" marginTop={1}>
                        {product.price} kr
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default ProductItem;