const User = require("../models/user-model");
const authUtility = require("../utilities/authentication");
const sessionData = require("../utilities/session-data");

function getSignUpPage(req, res) {
  res.render("customer/auth/signup", { error: "", enteredData: false });
}

let getLoginPage = (req, res) => {
  return res.render("customer/auth/login", { error: "", enteredData: false });
};

let signUp = async (req, res) => {
  const { emailid, password, fullname, street, postalcode, city } = req.body;
  const enteredData = {
    email: emailid,
    password: password,
    fullname: fullname,
    street: street,
    postalcode: postalcode,
    city: city,
  };
  const user = new User(emailid, password, fullname, street, postalcode, city);

  try {
    // Check if the user already exists
    const existingUser = await user.getExistingUserEmail();
    if (existingUser) {
      sessionData.showDataToSession(
        req,
        {
          errorMessage: "User email already exists!",
          ...enteredData,
        },
        () => {
          res.render("customer/auth/signup", {
            error: "User email already exists!",
            enteredData: enteredData,
          });
        }
      );
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
  const enteredData = {
    email: req.body.emailid,
    password: req.body.password,
  };

  if(enteredData.email.trim() === "" || enteredData.password.trim() === "") {    
    sessionData.showDataToSession(
    req,
    {
      errorMessage: "Please enter valid credentials to login!",
      ...enteredData,
    },
    () => {
      res.render("customer/auth/login", {
        error: "Please enter valid credentials to login!",
        enteredData: enteredData,
      });
    }
  );
  return;
}
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
    sessionData.showDataToSession(
      req,
      {
        errorMessage: "User email doesn not exist!",
        ...enteredData,
      },
      () => {
        res.render("customer/auth/login", {
          error: "User email does not exist!",
          enteredData: enteredData,
        });
      }
    );
    return;
  }

  const validatePassword = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!validatePassword) {
    sessionData.showDataToSession(
      req,
      {
        errorMessage: "Invalid password!",
        ...enteredData,
      },
      () => {
        res.render("customer/auth/login", {
          error: "Invalid password!",
          enteredData: enteredData,
        });
      }
    );
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
