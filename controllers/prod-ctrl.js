const { get } = require("mongoose");
const Product = require("../models/product-model");

async function getAllProducts(req, res, next) {
  try {
    if (!res.locals.isAdmin) {
      const products = await Product.findAllProducts();
      res.render("customer/pages/home", { products: products });
    } else {
      res.redirect("/admin/products");
    }
  } catch (err) {
    next(err);
  }
}

let getProductDetails = async (req, res, next) => {
  try {
    if (!res.locals.isAdmin) {
      const product = await Product.findById(req.params.id);
      res.render("customer/pages/view-single-product", { product: product });
    } else {
      res.redirect("/admin/products");
    }
  } catch (err) {
    next(err);
    return;
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
};
