import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";


export default function Cart() {
  const { cartItems, removeFromCart, clearCart, decreaseQuantity, increaseQuantity } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <section className="cart">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pb-52">
        <div className="pt-28">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-lora font-bold sm:text-left">
              Cart 🛒
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Clear All
              </button>
            )}
          </div>
          {cartItems.length === 0 ? (
            <p className="text-xl sm:text-4xl font-semibold text-center pb-40 mt-12">
              Your cart is empty..
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-4 gap-4"
              >
                <Link to={`/productdetails/${item.category}/${item.id}`}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    width={"200px"}
                    className="cursor-pointer transform transition duration-300 hover:scale-110"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:text-black"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:text-black"
                  >
                    +
                  </button>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {/* Cart Summary Section */}
          {cartItems.length > 0 && (
            <div className="mt-8 flex justify-end pt-4">
              <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Number of Items:</span>
                  <span>{calculateTotalItems()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total Price:</span>
                  <span className="font-bold">${calculateTotalPrice()}</span>
                </div>
                <Link to={"/checkout"}>
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded mb-2 transition">
                    Checkout
                  </button>
                </Link>
                <Link to="/products">
                  <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded transition hover:bg-gray-200 dark:hover:bg-gray-700">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
