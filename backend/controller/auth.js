const bcrypt = require("bcrypt");
const User = require("../model/user");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const save = await newUser.save();
      return res.status(200).json(save);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).json("wrong user name!");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if(!validPassword){
        return res.status(404).json("wrong password!");
      }

      if(user && validPassword){
        return res.status(200).json(user)
      }
    } catch (err) {
        return res.status(500).json(err)
    }
  },
};

module.exports = authController;