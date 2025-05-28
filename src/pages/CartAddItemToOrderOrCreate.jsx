import { supabase } from '../lib/supabaseClient';

export async function addItemToOrderOrCreate(customer_id, book) {
    try {
        // 1. Kiểm tra xem đã có đơn hàng 'pending' chưa
        const { data: existingOrder, error: fetchError } = await supabase
            .from('Orders')
            .select('*')
            .eq('customer_id', customer_id)
            .eq('status', 'pending')
            .single();

        let orderId;

        if (fetchError && fetchError.code !== 'PGRST116') {
            // Nếu có lỗi khác ngoài "not found", ném ra
            throw fetchError;
        }

        if (existingOrder) {
            // Đã có đơn hàng pending
            orderId = existingOrder.order_id;
        } else {
            // 2. Tạo đơn hàng mới nếu chưa có
            const { data: newOrder, error: insertError } = await supabase
                .from('Orders')
                .insert({
                    customer_id,
                    order_date: new Date().toISOString().split('T')[0],
                    total_amount: 0,
                    status: 'pending',
                })
                .select()
                .single();

            if (insertError) throw insertError;
            orderId = newOrder.order_id;
        }

        // 3. Kiểm tra xem sách đã tồn tại trong OrderDetails chưa
        const { data: existingDetail, error: detailError } = await supabase
            .from('OrdersDetails')
            .select('*')
            .eq('order_id', orderId)
            .eq('book_id', book.id)
            .single();

        if (existingDetail) {
            // Nếu đã có -> tăng số lượng
            const newQuantity = existingDetail.quantity + 1;

            const { error: updateError } = await supabase
                .from('OrdersDetails')
                .update({ quantity: newQuantity })
                .eq('order_id', orderId)
                .eq('book_id', book.id);

            if (updateError) throw updateError;
        } else {
            // Nếu chưa có -> insert mới
            const { error: insertDetailError } = await supabase
                .from('OrdersDetails')
                .insert({
                    order_id: orderId,
                    book_id: book.id,
                    quantity: 1,
                    unit_price: book.price,
                });

            if (insertDetailError) throw insertDetailError;
        }

        const { data: updatedDetails, error: sumError } = await supabase
            .from('OrdersDetails')
            .select('quantity, unit_price')
            .eq('order_id', orderId);

        if (sumError) throw sumError;

        const total = updatedDetails.reduce(
            (sum, item) => sum + item.quantity * item.unit_price,
            0
        );

        const { error: updateOrderError } = await supabase
            .from('Orders')
            .update({ total_amount: total })
            .eq('order_id', orderId);

        if (updateOrderError) throw updateOrderError;


        return orderId;

    } catch (err) {
        console.error('❌ Lỗi trong addItemToOrderOrCreate:', err);
        throw err;
    }
}
