const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: create a user using post "/api/auth/createuser". doesn't require Auth (no login required)
router.post("/createuser", [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password').isLength({ min: 5 }),
], async (req, res) => {
    // If there is any errors, return Bad request and the errors 
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // check if user is already exists 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false
            return res.status(400).json({ success, error: "Sorry user with this email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // else creating user and sending data to server to save
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error" });
    }
})


// Route 2: create a user using post "/api/auth/login". register required 
router.post("/login", [
    body('email', "Enter valid Email").isEmail(),
    body('password', "Pssword cannot be blank").exists(),
], async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!email) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct creditentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct creditentials" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Internal server error" });
    }

})

// ROUTE 3: Get logdedin User Details using: POST "/api/auth/getuser". login required 
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success = true
        res.send({ success, user })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Internal server error" });
    }

})


module.exports = router;