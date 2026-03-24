import { Button, Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RatingForm from "../components/RatingForm";
import Rating from "../components/Rating";
import ProductItemLarge from "../components/ProductItemLarge";
import Category from "../components/Category";
import RatingSummary from '../components/RatingSummary';
import { getOne, addRating } from "../services/ProductService";
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        getOne(id).then((response) => { 
            console.log("response:", response);
            setProduct(response);
        });
      }, [id]);
    
      function onRatingAdd() {
    getOne(id).then((product) => setProduct(product));
        }

        const handleAddToCart = async () => {
                if (!product) return;
                await addToCart(product, 1);
        };
    
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto auto', gap: '20px', padding: '20px' }}>
            <img src={product?.imageUrl} style={{ gridColumn: '1 / -1', gridRow: '1', width: '100%', height: '600px', objectFit: 'cover', borderRadius: '8px', border: '2px solid black' }} />
            <div style={{ gridColumn: '1', gridRow: '2 / 4' }}>
                <ProductItemLarge product={product}/>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="contained" onClick={handleAddToCart} sx={{ backgroundColor: '#b2ff59', color: '#000', fontWeight: 'bold', '&:hover': { backgroundColor: '#9cef5d' } }}>Lägg i kundvagn</Button>
                    <Button variant="contained" onClick={() => navigate(-1)} sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#333' } }}>Tillbaka</Button>
                    <Button variant="contained" onClick={() => navigate(`/products/${product?.id}/edit`)} sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#333' } }}>Ändra</Button>
                </div>
            </div>
            <div style={{ gridColumn: '2', gridRow: '2' }}>
                <RatingForm  productId={id} onSave={onRatingAdd} />
                <RatingSummary ratings={product?.ratings} />
                <Box sx={{ marginTop: 3 }}>
                    {product?.ratings && product.ratings.map((rating, i) => (
                        <Rating key={`rating_${i}`} rating={rating} />
                    ))}
                </Box>
            </div>
        </div>
     );
}

export default ProductDetail;