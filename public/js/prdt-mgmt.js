const deleteProductbtns = document.querySelectorAll(".product-card button");

async function deleteProduct(e) {
  const btnElement = e.target;
  const productId = btnElement.dataset.productid;
  const csrfToken = btnElement.dataset.csrf;
  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Something went wrong...Failed to delete the product");
    return;
  }

  // Just went with the dom traversal....I dont use or have never used such below code ever!
  btnElement.parentElement.parentElement.parentElement.remove();
}
for (const deleteBtns of deleteProductbtns) {
  deleteBtns.addEventListener("click", deleteProduct);
}
