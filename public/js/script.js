// alert("script.js linked successfully!")
let menuBtn = document.getElementById("menu-btn");
let closeBtn = document.getElementById("close-btn");
menuBtn.addEventListener("click", () => {
  document.querySelector(".desktop-hide").style.display = "block";
});
closeBtn.addEventListener("click", () => {
  document.querySelector(".desktop-hide").style.display = "none";
});

//Form validation

document.querySelector("form").addEventListener("submit", (e) => {
  let emailElement = document.getElementById("emailid").value.trim();
  let passwordElement = document.getElementById("password").value.trim();
  let confirmEmailElement = document
    .getElementById("confirm-email")
    .value.trim();
  let fullNameElement = document.getElementById("fullname").value.trim();
  let streetElement = document.getElementById("street").value.trim();
  let postalCodeElement = document.getElementById("postal-code").value.trim();
  let cityElement = document.getElementById("city").value.trim();

  let displayFormErrorElement = document.querySelector(".form-err");

  if (emailElement === "" || confirmEmailElement === "") {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Please enter a valid email address!</p>`;
    return;
  }

  if (!validateEmail(emailElement) && !validateEmail(confirmEmailElement)) {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Please include '@' and provide a valid domain!</p>`;
    return;
  }

  if (emailElement !== confirmEmailElement) {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Emails do not match!</p>`;
    return;
  }

  if (passwordElement.lentgh <= 6 || passwordElement === "") {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Please create a valid password of length more than 6!</p>`;
    return;
  }

  if (fullNameElement === "") {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Please fill in your name</p>`;
    return;
  }

  if (cityElement === "" || streetElement === "" || postalCodeElement === "") {
    e.preventDefault();
    displayFormErrorElement.innerHTML = `<p>Please check your city, street and postal code data!</p>`;
    return;
  }
});

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
