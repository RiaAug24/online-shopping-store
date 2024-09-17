const Product = require("../models/product-model");

let addItemToCart = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart Updated",
    totalItems: cart.totalQuantity,
  });
};

let getCartPage = async (req, res) => {
  if (!res.locals.isAdmin) {
    res.render("customer/pages/cart");
  } else {
    return res.status(404).render("shared/404");
  }
  return;
};

let updateCartItem = (req, res) => {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity
  );
  req.session.cart = cart;

   return res.json({
    message: "Item Count Updated!",
    updatedCartData: {
      newTotQuantity: cart.totalQuantity,
      newTotPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
};

module.exports = {
  addItemToCart: addItemToCart,
  getCartPage: getCartPage,
  updateCartItem: updateCartItem,
};
