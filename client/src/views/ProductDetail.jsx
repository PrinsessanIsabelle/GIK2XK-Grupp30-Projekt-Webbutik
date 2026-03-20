import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RatingForm from "../components/RatingForm";
import Rating from "../components/Rating";
import ProductItemLarge from "../components/ProductItemLarge";

function ProductDetail() {
    const product = 
    {
        "id": 1001,
        "productName": "Earl Grey Black Tea 20-pack",
        "description": "Classic Earl Grey with bergamot aroma in 20 tea bags, perfect for morning or afternoon tea breaks.",
        "price": 39,
        "imageUrl": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-19T14:14:59.000Z",
        "updatedAt": "2026-03-19T14:14:59.000Z",
        "categories": [
            "Tea"
        ],
        "ratings": [
            {
                "id": 1,
                "rating": 5,
                "body": "Fantastiskt te, väldigt aromatiskt!",
                "createdAt": "2026-03-19T14:14:59.000Z"
            }
        ]
    }

    const navigate = useNavigate();
    
    return ( 
        <div>
            <ProductItemLarge product={product}/>
            <Button onClick={() => navigate(-1)}>Tillbaka</Button>
            <Button onClick={() => navigate('/products/${product.id}/edit')}>Ändra</Button>
            <RatingForm />
            {product.ratings && product.ratings.map((rating, i) =>(
                <Rating key={`rating_${i}`} rating={rating} />
            ))}
        </div>
     );
}

export default ProductDetail;