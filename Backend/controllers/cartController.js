

// // add product to user cart

// import userModel from "../models/userModel.js"


// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;

//     // ✅ check userId
//     if (!userId) {
//       return res.json({
//         success: false,
//         message: "User not authorized",
//       });
//     }

//     const userData = await userModel.findById(userId);

//     // ✅ check user exists
//     if (!userData) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let cartData = userData.cartData || {};

//     if (cartData[itemId]) {
//       cartData[itemId][size]
//         ? (cartData[itemId][size] += 1)
//         : (cartData[itemId][size] = 1);
//     } else {
//       cartData[itemId] = { [size]: 1 };
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Added To Cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };



// // update cart

// const updateCart = async (req,res) =>{

//     try {
        
//         const {userId,itemId,size,quantity} = req.body
//         const userData = await userModel.findById(userId)

//         let   cartData = await userData.cartData;

//         cartData[itemId][size] = quantity

//          await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json({success:true, message:"Cart Updated"})


//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
        
//     }

// }

// // get usercart data

// const getUserCart = async (req,res) =>{

//     try {
//         const {userId} = req.body
//         const userData = await userModel.findById(userId)

//         let   cartData = await userData.cartData;

//         res.json({success: true, cartData})

        


//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
        
//     }

// }


// export { addToCart,updateCart,getUserCart} 


import userModel from "../models/userModel.js";

// add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User not authorized" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
