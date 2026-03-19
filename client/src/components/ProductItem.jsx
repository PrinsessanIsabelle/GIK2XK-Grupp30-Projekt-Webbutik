import { Link } from 'react-router-dom';

function ProductItem({product}) {
    return (
        <>
        <Link to={`/products/${product.id}`}>
            <img width={200} src={product.imageUrl}/>   
            <h3>{product.productName}</h3>
            <p>Pris: {product.price}</p>
        </Link>
    </>
    );
}

export default ProductItem;