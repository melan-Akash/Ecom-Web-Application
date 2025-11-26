import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [cartItems, setCartItems] = useState({});

  // Safe object clone
  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select product size!");
      return;
    }

    let cartData = clone(cartItems);

    // Item already exists
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } 
    // New item entry
    else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }

    return total;
  };

  const updateQuantity = async (itemId,size,quantity) =>{

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);


  }

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
