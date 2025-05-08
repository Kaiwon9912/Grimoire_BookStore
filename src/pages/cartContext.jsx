import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === book.id);
            if (existing) {
                return prevItems.map((item) =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...book, quantity: 1 }];
        });
    };


    const updateQuantity = (id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
