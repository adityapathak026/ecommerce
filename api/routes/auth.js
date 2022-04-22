const router = require("express").Router();
const User = require("../models/User");
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {

    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ Message: "User registered succesfully", savedUser })

    } catch (error) {
        res.status(500).json(error)

    }
});

//Login
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("User does not exist");

        const hashedPassword = Cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);
        originalPassword !== req.body.password &&
            res.status(401).json("Wrong credentials");

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
        );


        const { password, ...others } = user._doc;
        res.status(200).json({ Message: "Login successful", ...others, accessToken })

    } catch (error) {
        res.status(500).json(error)

    }
});


module.exports = router;