const Stripe = require("stripe");
require('dotenv').config();
const apikey = process.env.API_KEY;
console.log(apikey)
const stripe = Stripe(apikey);
const Order = require("../models/order-model");
const User = require("../models/user-model");
async function getOrder(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(err);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findUserById(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  req.session.cart = null;

  // This is your test secret API key.
  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}
function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  getOrder: getOrder,
  addOrder: addOrder,
  getSuccess: getSuccess,
  getFailure: getFailure,
};
