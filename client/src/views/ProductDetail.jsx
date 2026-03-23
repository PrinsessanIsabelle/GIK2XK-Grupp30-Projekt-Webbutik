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
        <div>
            <RatingSummary ratings={product?.ratings} />
            <ProductItemLarge product={product}/>
            <Button variant="contained" onClick={handleAddToCart}>Lägg i kundvagn</Button>
            <Button onClick={() => navigate(-1)}>Tillbaka</Button>
            <Button onClick={() => navigate(`/products/${product?.id}/edit`)}>Ändra</Button>
            <RatingForm productId={id} onSave={onRatingAdd}/>
            <Box sx={{ maxWidth: 600, marginTop: 3 }}>
                {product?.ratings && product.ratings.map((rating, i) => (
                    <Rating key={`rating_${i}`} rating={rating} />
                ))}
            </Box>
        </div>
     );
}

export default ProductDetail;