const { get } = require("../routes/auth-route");

let getSignUpPage = (req, res) => {
    
    
  
  
  
    return res.render("/signup");
};


module.exports = {
    getSignUpPage: getSignUpPage
}