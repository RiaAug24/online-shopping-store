const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; // name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageURL = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }
  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("products").insertOne(productData);
  }

  async update(productId) {
    let prdtId;
    try {
      prdtId = new ObjectId(productId);
      // console.log(prdtId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    await db.getDb().collection("products").updateOne({ _id:prdtId }, {$set: {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image
    }});
  }

  static async findById(ProductId) {
    let prdtId;
    try {
      prdtId = new ObjectId(ProductId);
      // console.log(prdtId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prdtId });
    if (!product) {
      const error = new Error(
        "Could not find a product with selected product Id."
      );
      error.code = "404";
      throw error;
    }
    return product;
  }

  static async findAllProducts() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  }
}

module.exports = Product;
