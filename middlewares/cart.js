const Cart = require("../models/cart-model");

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  res.locals.cart = cart;

  next();
}

async function updateCartPrices(req, res, next) {
  const cart = res.locals.cart;

  await cart.updatePrices();

  // req.session.cart = cart;
  next();
}

module.exports = {
  initializeCart: initializeCart,
  updateCartPrices: updateCartPrices,
};
