let getProducts = (req, res) => {
  res.render("admin/products/all-products");
};

let getNewProduct = (req, res) => {
  res.render("admin/products/new-product");
};

let createNewProduct = (req, res) => {
  let retrievedData;
  console.log(req.body);
  console.log(req.file);
  res.redirect("/admin/products");
};

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
