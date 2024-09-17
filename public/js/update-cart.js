// alert("Linked success!");

const cartItemUpdateForm = document.querySelectorAll(".cart-item-mgmt");
const cartTotalPrice = document.getElementById("total-amount");
const cartCountBadge = document.querySelectorAll("#cart-icon p .item-count");

const buyProductBtn = document.querySelector("#cart-footer form button");

console.log(cartCountBadge);
async function updateCartItem(e) {
  e.preventDefault();
  const form = e.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const itemQuantity = form.querySelector(".prdt-qty-field").value;
  console.log(itemQuantity);
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
    alert("Something went wrong...");
    return;
  }

  if (!response.ok) {
    alert("An Error occurred!..");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  const cartItemTotPrice = form.parentElement.querySelector(".prdt-tot-cost");
  for (const cartBadge of cartCountBadge) {
    cartBadge.textContent = responseData.updatedCartData.newTotQuantity;
  }

  if (responseData.updatedCartData.newTotPrice === 0) {
    buyProductBtn.style.display = "none";
    cartTotalPrice.style.display = "none";
  }
  cartTotalPrice.textContent =
    "Total: Rs " + responseData.updatedCartData.newTotPrice;
  if (responseData.updatedCartData.updatedItemPrice === 0) {
    form.parentElement.parentElement.remove();
  }
  cartItemTotPrice.textContent =
    "Amount: Rs " + responseData.updatedCartData.updatedItemPrice;

  if (cartTotalPrice.textContent === 0) {
    buyProductBtn.style.display = "none";
  }
}

for (const formElement of cartItemUpdateForm) {
  formElement.addEventListener("submit", updateCartItem);
}
