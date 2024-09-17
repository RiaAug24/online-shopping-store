const db = require("../data/database");
const mongodb = require("mongodb");
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
      prdtId = new mongodb.ObjectId(productId);
      // console.log(prdtId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    await db.getDb().collection("products").updateOne({ _id: prdtId }, {$set: {
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
        prdtId = new mongodb.ObjectId(ProductId);
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
    
    // Use the constructor to create a Product instance
    return new Product(product);
}

static async findMultiple(ids) {
  const productIds = ids.map(function(id) {
    return new mongodb.ObjectId(id);
  })
  
  const products = await db
    .getDb()
    .collection('products')
    .find({ _id: { $in: productIds } })
    .toArray();

  return products.map(function (productDocument) {
    return new Product(productDocument);
  });
}

  static async findAllProducts() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  }


  static async delete(productId) {
    let prdtId;
    try {
      prdtId = new mongodb.ObjectId(productId);
      // console.log(prdtId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    await db.getDb().collection("products").deleteOne({ _id: prdtId});
  }
}

module.exports = Product;
