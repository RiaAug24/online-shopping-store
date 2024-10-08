const Product = require("../models/product-model");
const Order = require("../models/order-model");

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

let getUpdateProduct = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    // console.log(product);
    if (res.locals.isAdmin) {
      res.render("admin/products/update-product", { product: product });
      return;
    } else {
      return res.status(403).render("shared/403");
    }
  } catch (error) {
    next(error);
  }
};

let updateProductDetails = async (req, res, next) => {
  try {
    // Fetch the existing product from the database
    const existingProduct = await Product.findById(req.params.id);

    // Create an object to hold the updated product details
    const updatedProductData = {
      ...req.body,
      // Use the new image if uploaded, otherwise keep the existing image
      image: req.file ? req.file.filename : existingProduct.image,
    };

    // Create a new product instance with the updated data
    const prodId = req.params.id;
    const product = new Product(updatedProductData);

    // Update the product details in the database
    await product.update(prodId);
    // Redirect to the admin products page after successful update
  } catch (error) {
    next(error);
    return;
  }
  return res.redirect("/admin/products");
};

let deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    await Product.delete(productId);
  } catch (err) {
    next(err);
    return;
  }
  // return res.redirect("/admin/products");
  res.json({ message: "Deleted product" });
};

let getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
};
async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  console.log(req.params.id);
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProductDetails: updateProductDetails,
  deleteProduct: deleteProduct,
  getAllOrders: getAllOrders,
  updateOrder: updateOrder,
};
