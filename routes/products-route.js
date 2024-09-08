const express = require("express");

const router = express.Router();

router.get('/products', (req, res) => {
    if(!res.locals.isAdmin) {
        res.render('customer/pages/home')
    }
    else {
        res.redirect('/admin/products')
    }
    
})
module.exports = router;