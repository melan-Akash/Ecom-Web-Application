// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const[token,setToken] = useState('')

//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
//   const  navigate = useNavigate();

//   const clone = (obj) => JSON.parse(JSON.stringify(obj));

//   const addToCart = (itemId, size) => {
//     if (!size) {
//       toast.error("Select product size!");
//       return;
//     }

//     let cartData = clone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = { [size]: 1 };
//     }

//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         total += cartItems[itemId][size];
//       }
//     }
//     return total;
//   };

//   const updateQuantity = (itemId, size, quantity) => {
//     let cartData = clone(cartItems);
//     cartData[itemId][size] = quantity;
//     setCartItems(cartData);
//   };

//   const getCartAmount = () => {
//     let total = 0;

//     for (const itemId in cartItems) {
//       const productData = products.find(p => p._id === itemId);
//       if (!productData) continue;

//       for (const size in cartItems[itemId]) {
//         const qty = cartItems[itemId][size];
//         if (qty > 0) {
//           total += productData.price * qty;
//         }
//       }
//     }

//     return total;
//   };

//   const getProductsData = async () => {
//     try {
//         const response = await axios.get(backendUrl + '/api/product/list')
//         if(response.data.success){
//           setProducts(response.data.products)
//         } else {
//           toast.error(response.data.message)
//         }

      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
      
//     }
//   }

//   useEffect(()=>{
//     getProductsData()

//   },[])

//   useEffect(()=>{
//     if(!token && localStorage.getItem('token')) {
//       setToken(localStorage.getItem('token'))

//     }
//   },[])

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     setToken,
//     token
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  // ✅ FIX: make async
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size!");
      return;
    }

    let cartData = clone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    // ✅ FIX: async API call works now
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
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

  const updateQuantity = async (itemId, size, quantity) => {
  let cartData = clone(cartItems);
  cartData[itemId][size] = quantity;
  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(
        backendUrl + '/api/cart/update',
        { itemId, size, quantity },
        { headers: { token } }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  };


  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const productData = products.find((p) => p._id === itemId);
      if (!productData) continue;

      for (const size in cartItems[itemId]) {
        total += productData.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);

    }
  };

  const getUserCart = async (token) =>{
    try {
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})

      if (response.data.success) {
        setCartItems(response.data.cartData)
        
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);

      
    }

  }

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

