const Product = require("../models/product-model");

let getProducts = async (req, res, next) => {
  if (res.locals.isAdmin) {
    try {
      const products = await Product.findAllProducts();
      res.render("admin/products/all-products", { products: products });
    } catch (err) {
      next(err);
      return;
    }
  } else {
    res.status(403).render("shared/403");
  }
};

let getNewProduct = (req, res) => {
  if (res.locals.isAdmin) {
    res.render("admin/products/new-product");
  } else {
    res.status(403).render("shared/403");
  }
};

let createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
};

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
