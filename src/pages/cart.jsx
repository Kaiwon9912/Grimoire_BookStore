import { useCart } from './cartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bangers text-green-400 mb-8 text-center">Giỏ hàng</h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <>
                        <table className="w-full table-auto border border-green-600 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-green-900 text-white">
                                    <th className="py-3 px-4">STT</th>
                                    <th className="py-3 px-4"> </th>
                                    <th className="py-3 px-4">Tên sách</th>
                                    <th className="py-3 px-4">Giá</th>
                                    <th className="py-3 px-4">Số lượng</th>
                                    <th className="py-3 px-4">Tổng</th>
                                    <th className="py-3 px-4">Xoá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="border-t border-green-800 text-center">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">
                                            <img src={item.cover_url} alt={item.title} className="w-16 h-24 object-cover" />
                                        </td>
                                        <td className="py-2 px-4">{item.title}</td>
                                        <td className="py-2 px-4">{item.price.toLocaleString()}</td>
                                        <td className="py-2 px-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="bg-gray-600 hover:bg-gray-500 px-2 rounded"
                                                >-</button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="bg-gray-600 hover:bg-gray-500 px-2 rounded"
                                                >+</button>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-green-400 whitespace-nowrap text-right min-w-[140px]">
                                            {(item.price * item.quantity).toLocaleString()} ₫
                                        </td>

                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Tổng cộng dưới bảng */}
                        <div className="text-right mt-4">
                            <p className="text-xl font-semibold">
                                Tổng cộng:{' '}
                                <span className="text-green-400">{totalAmount.toLocaleString()} ₫</span>
                            </p>
                        </div>

                        {/* Nút thanh toán */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
                            >
                                Thanh toán
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
