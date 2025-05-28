// src/hooks/useCart.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';
import { useOrder } from './useOrder';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const { getOrCreatePendingOrder } = useOrder();

    const fetchCartItems = async () => {
        if (!user) return;

        const order = await getOrCreatePendingOrder();

        const { data, error } = await supabase
            .from('OrdersDetails')
            .select('book_id, quantity, unit_price, Book(title, cover_url)')
            .eq('order_id', order.order_id);

        if (error) {
            console.error('❌ Lỗi khi tải giỏ hàng:', error);
            return;
        }

        const items = data.map((detail) => ({
            id: detail.book_id,
            title: detail.Book?.title || '',
            cover_url: detail.Book?.cover_url || '',
            price: detail.unit_price,
            quantity: detail.quantity,
        }));

        setCartItems(items);
    };

    useEffect(() => {
        fetchCartItems();
    }, [user]);

    return { cartItems, setCartItems, fetchCartItems };
};
