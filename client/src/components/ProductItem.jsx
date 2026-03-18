function ProductItem({product}) {
    return (
        <>
            <h3>{product.productName}</h3>
            <p>Pris: {product.price}</p>
    </>
     );
}

export default ProductItem;