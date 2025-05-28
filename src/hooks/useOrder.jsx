import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export const useOrder = () => {
    const { user } = useAuth();
    const getOrCreatePendingOrder = async () => {
        const { data: existingOrder } = await supabase
            .from('Orders')
            .select('*')
            .eq('customer_id', user.id)
            .eq('status', 'pending')
            .single();

        if (existingOrder) return existingOrder;

        const { data: newOrder } = await supabase
            .from('Orders')
            .insert({
                customer_id: user.id,
                order_date: new Date().toISOString().split('T')[0],
                total_amount: 0,
                status: 'pending',
            })
            .select()
            .single();

        return newOrder;
    };


    const addOrderDetail = async ({ order_id, book_id, quantity, unit_price }) => {
        // Kiểm tra đã có trong orders_details chưa
        const { data: existing, error: fetchError } = await supabase
            .from('OrdersDetails')
            .select('*')
            .eq('order_id', order_id)
            .eq('book_id', book_id)
            .maybeSingle();

        if (existing) {
            // Nếu đã có, cập nhật số lượng
            const newQuantity = existing.quantity + quantity;

            const { error: updateError } = await supabase
                .from('OrdersDetails')
                .update({ quantity: newQuantity })
                .eq('order_id', order_id)
                .eq('book_id', book_id);

            if (updateError) throw updateError;
        } else {
            // Nếu chưa có, chèn mới
            const { error: insertError } = await supabase
                .from('OrdersDetails')
                .insert({ order_id, book_id, quantity, unit_price });

            if (insertError) throw insertError;
        }
    };

    return { getOrCreatePendingOrder, addOrderDetail };
};

