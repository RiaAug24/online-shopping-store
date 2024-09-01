const User = require("../models/user-model");
const authUtility = require("../utilities/authentication");
function getSignUpPage(req, res) {
  res.render("customer/auth/signup", { error: "" });
}

let getLoginPage = (req, res) => {
  return res.render("customer/auth/login");
};

let signUp = async (req, res) => {
  const { emailid, password, fullname, street, postalcode, city } = req.body;

  const user = new User(emailid, password, fullname, street, postalcode, city);

  try {
    // Check if the user already exists
    const existingUser = await user.getExistingUserEmail();
    if (existingUser) {
      res.render("customer/auth/signup", { error: "User email already exists!" });
      return;
    }

    // Proceed with signup
    await user.signup();
    res.redirect("/login");
  } catch (error) {
    next(error);
    return;
  }
};


async function login(req, res) {
  const user = new User(req.body.emailid, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getExistingUserEmail();
  } catch (error) {
    next(error);
    return;
  }

  // return console.log(existingUser);
  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const validatePassword = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!validatePassword) {
    res.redirect("/login");
    return;
  }

  authUtility.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
}

function logoutUser(req, res) {
  authUtility.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignUpPage: getSignUpPage,
  getLoginPage: getLoginPage,
  signUp: signUp,
  login: login,
  logoutUser: logoutUser,
};
