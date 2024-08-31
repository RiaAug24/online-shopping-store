const User = require("../models/user-model");
const authUtility = require("../utilities/authentication");
function getSignUpPage(req, res) {
  res.render("customer/auth/signup");
}

let getLoginPage = (req, res) => {
  return res.render("customer/auth/login");
};

let signUp = async (req, res) => {
  const user = new User(
    req.body.emailid,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/login");
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
