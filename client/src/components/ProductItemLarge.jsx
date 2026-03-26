import { purple } from "@mui/material/colors";
import Category from "./Category";

// Detaljvy för en enskild produkt med tillhörande kategorier
function ProductItemLarge({ product }) {

    // Enkel fallback under inläsning
    if (!product) return <p>Laddar...</p>;
    return (
        <div style={{ padding: '20px' }}>
            <h3>{product.productName}</h3>
            {product.categories &&
             product.categories.map((category) => <Category key={`category_${category}`} text={category} />)}

            <h4>{product.price} :-</h4>
            <h5>Produkt beskrivning:</h5>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductItemLarge;