import { purple } from "@mui/material/colors";
import Category from "./Category";

function ProductItemLarge({ product }) {

    if (!product) return <p>Laddar...</p>;
    return ( 
        <div>
        <h3>{product.productName}</h3>
            {product.categories &&
             product.categories.map((category) => <Category key={`category_${category}`} text={category} />)}

            <div>
              <img src={product.imageUrl} />
              <h4>{product.price} :-</h4>
              <h5>Produkt beskrivning:</h5>
              <p>{product.description}</p>
              </div>
        </div>
           
     );
}

export default ProductItemLarge;