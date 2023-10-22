const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = process.env;

// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).json({ message: 'All input is required'});
        }
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            config.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).json(user);
        }
        res.status(400).json({ message: 'Invalid Credentials'});
      } catch (err) {
        console.log(err);
      }
};

// register
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).json({ message: 'All input is required'});
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ message: 'User Already Exist. Please Login'});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            config.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
  login,
  register
};