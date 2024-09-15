// alert("Linked success!");

const cartItemUpdateForm = document.querySelectorAll(".cart-item-mgmt");
console.log(cartItemUpdateForm);
const cartTotalPrice = document.getElementById("total-amount");
const cartCountBadge = document.querySelectorAll("#cart-icon p .item-count");
async function updateCartItem(e) {
  e.preventDefault();
  const form = e.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const itemQuantity = form.querySelector(".prdt-qty-field").value;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: itemQuantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    alert("Something went wrong1...");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong2...");
    return;
  }

  const responseData = await response.json();
  const cartItemTotPrice = form.parentElement.querySelector(".prdt-tot-cost");

  
  cartItemTotPrice.textContent = "Amount: Rs " + responseData.updatedCartData.updatedItemPrice;
  cartTotalPrice.textContent = "Total: Rs " + responseData.updatedCartData.newTotPrice;
  cartCountBadge.textContent = responseData.updatedCartData.newTotQuantity;
}

for (const formElement of cartItemUpdateForm) {
  formElement.addEventListener("submit", updateCartItem);
}
