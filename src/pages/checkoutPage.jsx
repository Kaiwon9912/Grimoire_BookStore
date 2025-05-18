import { useCart } from './cartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 relative">
            {/* Nút quay lại nằm trên cùng bên trái */}
            <button
                onClick={() => navigate('/cart')}
                className="absolute top-6 left-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
                ← Quay về giỏ hàng
            </button>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bangers text-green-400 mb-8 text-center">Thanh toán</h1>

                <table className="w-full table-auto border border-green-600 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-green-900 text-left text-white">
                            <th className="py-3 px-4 border-b border-green-600"> </th>
                            <th className="py-3 px-4 border-b border-green-600">Tên sách</th>
                            <th className="py-3 px-4 border-b border-green-600 text-center">Số lượng</th>
                            <th className="py-3 px-4 border-b border-green-600 text-right">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className="border-t border-green-800">
                                <td className="py-2 px-4">
                                    <img src={item.cover_url} alt={item.title} className="w-16 h-24 object-cover" />
                                </td>
                                <td className="py-2 px-4 text-left">{item.title}</td>
                                <td className="py-2 px-4 text-center">{item.quantity}</td>
                                <td className="py-2 px-4 text-green-400 whitespace-nowrap text-right min-w-[140px]">
                                    {(item.price * item.quantity).toLocaleString()} ₫
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-6">
                    <p className="text-xl font-semibold">
                        Tổng cộng:{' '}
                        <span className="text-green-400">{totalAmount.toLocaleString()} ₫</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
