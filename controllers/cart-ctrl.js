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

module.exports = {
  addItemToCart: addItemToCart,
};
