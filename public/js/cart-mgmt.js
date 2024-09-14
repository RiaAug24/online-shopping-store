const addToCartBtn = document.getElementById("cart-btn");
let cartItemCountDesktop = document.querySelector("#cart-icon p .item-count");
let cartItemCountMobile = document.querySelector(".desktop-hide nav ul li.navlinks a#cart-icon p .item-count");

console.log(cartItemCountMobile);

async function addToCart() {
  const productId = addToCartBtn.dataset.productid;
  const csrfToken = addToCartBtn.dataset.csrf;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    alert("Something went wrong...");
    return;
  }
  // console.log(response);
  if (!response.ok) {
    alert("Faild to add to cart...");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  const newTotQuantity = responseData.totalItems;
  cartItemCountDesktop.textContent = newTotQuantity;
  cartItemCountMobile.textContent = newTotQuantity
}

addToCartBtn.addEventListener("click", addToCart);
