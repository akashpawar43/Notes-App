const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// create a user using post "/api/auth/". doesn't require Auth
router.post("/",[
    body('name', 'Enter valid name').isLength({min: 3}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({min: 5}),
] ,(req, res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({erros: errors.array()})
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user=> res.json(user));
    // res.send(req.body);
})

module.exports = router;