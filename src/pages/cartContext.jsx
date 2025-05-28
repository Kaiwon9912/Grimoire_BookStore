import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';
import { supabase } from '../lib/supabaseClient';
import { addItemToOrderOrCreate } from '../pages/CartAddItemToOrderOrCreate';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const { getOrCreatePendingOrder } = useOrder();

    // ✅ Tải giỏ hàng từ Supabase khi user đăng nhập
    const fetchCart = useCallback(async () => {
        if (!user?.id) return;

        const order = await getOrCreatePendingOrder();

        const { data, error } = await supabase
            .from('OrdersDetails')
            .select(`
                book_id,
                quantity,
                unit_price,
                Book (
                    title,
                    price,
                    cover_url
                )
            `)
            .eq('order_id', order.order_id);

        if (error) {
            console.error('❌ Lỗi khi tải OrdersDetails:', error);
            return;
        }

        const transformed = data.map((item) => ({
            id: item.book_id,
            title: item.Book.title,
            cover_url: item.Book.cover_url,
            quantity: item.quantity,
            price: item.unit_price,
        }));

        setCartItems(transformed);
    }, [user?.id, getOrCreatePendingOrder]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (book) => {
        if (!user) return;

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

        try {
            const orderId = await addItemToOrderOrCreate(user.id, book);
            await fetchCart();
            console.log("✅ Đã thêm vào đơn hàng", orderId);
        } catch (err) {
            console.error("❌ Lỗi khi thêm vào đơn hàng:", err);
        }
    };

    const updateOrderDetail = async ({ order_id, book_id, quantity }) => {
        const { error } = await supabase
            .from('OrdersDetails')
            .update({ quantity })
            .eq('order_id', order_id)
            .eq('book_id', book_id);

        if (error) console.error('Lỗi update quantity:', error);
    };

    const updateOrderTotal = async (order_id, items) => {
        const total = items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        const { error } = await supabase
            .from('Orders')
            .update({ total_amount: total })
            .eq('order_id', order_id);

        if (error) console.error('Lỗi update tổng tiền:', error);
    };

    const updateQuantity = async (id, newQuantity) => {
        const order = await getOrCreatePendingOrder();

        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedItems);

        await updateOrderDetail({
            order_id: order.order_id,
            book_id: id,
            quantity: newQuantity,
        });

        await updateOrderTotal(order.order_id, updatedItems);
        await fetchCart();
    };

    // ✅ Hàm xoá khỏi giỏ hàng
    const removeFromCart = async (id) => {
        const order = await getOrCreatePendingOrder();

        const updatedItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedItems);

        const { error } = await supabase
            .from('OrdersDetails')
            .delete()
            .eq('order_id', order.order_id)
            .eq('book_id', id);

        if (error) {
            console.error('❌ Lỗi khi xoá sản phẩm khỏi đơn hàng:', error);
        }

        await updateOrderTotal(order.order_id, updatedItems);
        await fetchCart();
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
