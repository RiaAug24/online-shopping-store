const updateOrderFormElements = document.querySelectorAll(
  ".order-actions form"
);

console.log(updateOrderFormElements);

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  console.log(formData);
  const newStatus = formData.get("status");
  const orderId = formData.get("id");
  const csrfToken = formData.get("_csrf");

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong - could not update order status.");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong - could not update order status.");
    return;
  }
  console.log(response);
  const responseData = await response.json();

  form.parentElement.parentElement.querySelector(".badge").textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener("submit", updateOrder);
}
