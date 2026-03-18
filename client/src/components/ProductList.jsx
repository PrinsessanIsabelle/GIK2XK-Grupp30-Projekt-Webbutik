import { useLayoutEffect } from "react";
import ProductItem from "./ProductItem";

function ProductList() {
    const products = [
    {
        "id": 1001,
        "productName": "Earl Grey Black Tea 20-pack",
        "description": "Classic Earl Grey with bergamot aroma in 20 tea bags, perfect for morning or afternoon tea breaks.",
        "price": 39,
        "imageUrl": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Tea"
        ],
        "ratings": []
    },
    {
        "id": 1002,
        "productName": "Sparkling Lemon Soda 33cl",
        "description": "Fuzzy lemon soda with fine bubbles and crisp citrus flavor, sold as a chilled single can.",
        "price": 14,
        "imageUrl": "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Fuzzy Drinks"
        ],
        "ratings": []
    },
    {
        "id": 1003,
        "productName": "Volt Energy Drink Original 50cl",
        "description": "Carbonated energy drink with caffeine and B-vitamins for a quick energy boost before training or study.",
        "price": 22,
        "imageUrl": "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Fuzzy Drinks",
            "Energy Drinks"
        ],
        "ratings": []
    },
    {
        "id": 1004,
        "productName": "Cold Brew Coffee 25cl",
        "description": "Smooth ready-to-drink cold brew coffee with notes of chocolate and low acidity.",
        "price": 28,
        "imageUrl": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Coffee"
        ],
        "ratings": []
    },
    {
        "id": 1005,
        "productName": "Orange Juice Not From Concentrate 1L",
        "description": "Fresh-tasting orange juice with no added sugar, packed in a 1 liter carton.",
        "price": 31,
        "imageUrl": "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Juice",
            "Water"
        ],
        "ratings": []
    },
    {
        "id": 1006,
        "productName": "Still Spring Water 50cl",
        "description": "Natural still spring water in a recyclable bottle, ideal for everyday hydration.",
        "price": 10,
        "imageUrl": "https://images.unsplash.com/photo-1564419439288-bd440f13f59d?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Water"
        ],
        "ratings": []
    },
    {
        "id": 1007,
        "productName": "Peppermint Herbal Tea 20-pack",
        "description": "Refreshing caffeine-free peppermint infusion in 20 tea bags for evening relaxation.",
        "price": 35,
        "imageUrl": "https://images.unsplash.com/photo-1594631661960-7f55e0eec5d0?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Tea"
        ],
        "ratings": []
    },
    {
        "id": 1008,
        "productName": "Cola Zero 33cl",
        "description": "Zero-sugar fuzzy cola with full flavor and lively carbonation.",
        "price": 13,
        "imageUrl": "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Fuzzy Drinks"
        ],
        "ratings": []
    },
    {
        "id": 1009,
        "productName": "Mango Energy Drink Sugar Free 50cl",
        "description": "Sugar-free energy drink with mango flavor, caffeine and taurine.",
        "price": 24,
        "imageUrl": "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Fuzzy Drinks",
            "Energy Drinks"
        ],
        "ratings": []
    },
    {
        "id": 1010,
        "productName": "Iced Latte Vanilla 25cl",
        "description": "Chilled vanilla latte made with Arabica coffee and milk, ready to drink.",
        "price": 29,
        "imageUrl": "https://images.unsplash.com/photo-1517701550927-30cf4ba1f9d0?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Energy Drinks",
            "Coffee"
        ],
        "ratings": []
    },
    {
        "id": 1011,
        "productName": "Apple Juice 1L",
        "description": "Cloudy apple juice with balanced sweetness, made from pressed apples.",
        "price": 27,
        "imageUrl": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Juice"
        ],
        "ratings": []
    },
    {
        "id": 1012,
        "productName": "Sparkling Mineral Water Lime 50cl",
        "description": "Refreshing carbonated mineral water with natural lime flavor.",
        "price": 12,
        "imageUrl": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
        "createdAt": "2026-03-18T14:08:59.000Z",
        "updatedAt": "2026-03-18T14:08:59.000Z",
        "categories": [
            "Fuzzy Drinks",
            "Water"
        ],
        "ratings": []
    }
]
    return (
        <ul>
        
            {products?.length > 0 ? (
                products.map((product) =>
                <li key={`products_${product.id}`}>
                    <ProductItem product={product}/>
                </li>
            )): (
                <h3>Kunde inte hitta produkt</h3>
            )}            
        </ul> 
    );
}

export default ProductList;