// sköter delat UI-tillstånd i frontend 
// (vad appen “minns” just nu och hur komponenter uppdateras).

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import {
    addProductToCart,
    checkoutCart,
    clearCart,
    getMyCart,
    removeCartRow,
    updateCartRowAmount
} from '../services/CartService';

const CartContext = createContext(null);
const GUEST_CART_STORAGE_KEY = 'guest_cart';

function buildCartFromGuestRows(rows = []) {
    const normalizedRows = rows.map((row) => {
        const amount = Number(row.amount) || 0;
        const price = Number(row.product?.price) || 0;

        return {
            id: row.id,
            amount,
            lineTotal: amount * price,
            product: {
                id: row.product?.id,
                productName: row.product?.productName,
                price,
                imageUrl: row.product?.imageUrl
            }
        };
    });

    const totalAmount = normalizedRows.reduce((sum, row) => sum + row.amount, 0);
    const totalPrice = normalizedRows.reduce((sum, row) => sum + row.lineTotal, 0);

    return {
        id: 'guest',
        userId: null,
        payed: false,
        totalAmount,
        totalPrice,
        rows: normalizedRows
    };
}

function loadGuestCart() {
    try {
        const stored = JSON.parse(localStorage.getItem(GUEST_CART_STORAGE_KEY));
        if (!stored || !Array.isArray(stored.rows)) {
            return buildCartFromGuestRows([]);
        }

        return buildCartFromGuestRows(stored.rows);
    } catch (error) {
        console.error('Kunde inte läsa gästkundvagn från localStorage.', error);
        return buildCartFromGuestRows([]);
    }
}

function saveGuestCart(cart) {
    localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify({ rows: cart.rows || [] }));
}

function addProductToGuestCart(product, amount) {
    const currentCart = loadGuestCart();
    const existingRow = currentCart.rows.find((row) => row.product.id === product.id);

    let updatedRows;
    if (existingRow) {
        updatedRows = currentCart.rows.map((row) =>
            row.product.id === product.id
                ? {
                      ...row,
                      amount: row.amount + amount
                  }
                : row
        );
    } else {
        updatedRows = [
            ...currentCart.rows,
            {
                id: product.id,
                amount,
                lineTotal: Number(product.price || 0) * amount,
                product: {
                    id: product.id,
                    productName: product.productName,
                    price: Number(product.price || 0),
                    imageUrl: product.imageUrl
                }
            }
        ];
    }

    return buildCartFromGuestRows(updatedRows);
}

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState(buildCartFromGuestRows([]));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function loadCart() {
            setError(null);

            if (!user) {
                const guestCart = loadGuestCart();
                if (!ignore) {
                    setCart(guestCart);
                }
                return;
            }

            setIsLoading(true);
            const response = await getMyCart();
            if (!ignore) {
                setCart(response || buildCartFromGuestRows([]));
                setIsLoading(false);
            }
        }

        loadCart();

        return () => {
            ignore = true;
        };
    }, [user]);

    const addToCart = async (product, amount = 1) => {
        setError(null);

        if (!product?.id) {
            setError('Ogiltig produkt.');
            return null;
        }

        if (user) {
            const response = await addProductToCart(product.id, amount);
            if (response) {
                setCart(response);
                return response;
            }

            // If local user state exists but session/cookie is missing, keep UX working.
            const fallbackCart = addProductToGuestCart(product, amount);
            setCart(fallbackCart);
            saveGuestCart(fallbackCart);
            setError('Kunde inte spara till serverns kundvagn. Produkten lades i lokal kundvagn.');
            return fallbackCart;
        }

        const nextCart = addProductToGuestCart(product, amount);
        setCart(nextCart);
        saveGuestCart(nextCart);
        return nextCart;
    };

    const updateAmount = async (rowId, amount) => {
        setError(null);

        if (amount <= 0) {
            return removeFromCart(rowId);
        }

        if (user) {
            const response = await updateCartRowAmount(rowId, amount);
            if (!response) {
                setError('Kunde inte uppdatera antal i kundvagnen.');
                return null;
            }

            setCart(response);
            return response;
        }

        const currentCart = loadGuestCart();
        const updatedRows = currentCart.rows.map((row) =>
            row.id === rowId ? { ...row, amount } : row
        );
        const nextCart = buildCartFromGuestRows(updatedRows);
        setCart(nextCart);
        saveGuestCart(nextCart);
        return nextCart;
    };

    const removeFromCart = async (rowId) => {
        setError(null);

        if (user) {
            const response = await removeCartRow(rowId);
            if (!response) {
                setError('Kunde inte ta bort raden från kundvagnen.');
                return null;
            }

            setCart(response);
            return response;
        }

        const currentCart = loadGuestCart();
        const nextCart = buildCartFromGuestRows(
            currentCart.rows.filter((row) => row.id !== rowId)
        );
        setCart(nextCart);
        saveGuestCart(nextCart);
        return nextCart;
    };

    const clearAll = async () => {
        setError(null);

        if (user) {
            const response = await clearCart();
            if (!response) {
                setError('Kunde inte tömma kundvagnen.');
                return null;
            }

            setCart(response);
            return response;
        }

        const emptyCart = buildCartFromGuestRows([]);
        setCart(emptyCart);
        saveGuestCart(emptyCart);
        return emptyCart;
    };

    const checkout = async () => {
        setError(null);

        if (user) {
            const response = await checkoutCart();
            if (!response) {
                setError('Kunde inte genomföra checkout.');
                return null;
            }

            setCart(buildCartFromGuestRows([]));
            return response;
        }

        const emptyCart = buildCartFromGuestRows([]);
        setCart(emptyCart);
        saveGuestCart(emptyCart);
        return emptyCart;
    };

    const value = useMemo(
        () => ({
            cart,
            isLoading,
            error,
            addToCart,
            updateAmount,
            removeFromCart,
            clearAll,
            checkout
        }),
        [cart, error, isLoading]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    return useContext(CartContext);
}