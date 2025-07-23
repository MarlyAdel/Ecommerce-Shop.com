import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //^ Quantity increase & decrease
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // remove items with 0 quantity
    );
  };

  const [cartId, setCartId] = useState(null);

  const handleVisaCheckout = async () => {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {},
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      // Redirect to Stripe Checkout
      window.location.href = data.session.url;
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
 
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      toast.success("The Product added to the Cart successfully ", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      toast.success("The Product added to the Cart successfully ", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };


  

  const clearCart = () => {
    setCartItems([]);
    if (userToken) {
      localStorage.removeItem(`cart_${userToken}`);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        handleVisaCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

