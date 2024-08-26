function getSignUpPage (req, res) {
   res.render("customer/auth/signup");
};

let getLoginPage = (req, res) => {
    return res.render("login");
  };

module.exports = {
  getSignUpPage: getSignUpPage,
  getLoginPage: getLoginPage
};
