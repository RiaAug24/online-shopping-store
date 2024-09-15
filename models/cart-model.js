class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity += 1;
        cartItem.totalPrice = product.price * cartItem.quantity;
        this.items[i] = cartItem;

        this.totalQuantity += 1;
        this.totalPrice += product.price;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity += 1;
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = { ...item };
        const quanityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;

        cartItem.totalPrice = item.product.price * newQuantity;
        this.items[i] = cartItem;
        this.totalQuantity += quanityChange;
        this.totalPrice += quanityChange * item.product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
