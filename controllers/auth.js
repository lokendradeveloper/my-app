const User = require('../modelSchema/userSchema');
const { registerValidation, loginValidation } = require('../validation/registerValidation');

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// register Controller
const registerController = async (req, res) => {
  const { error } = registerValidation(req.body);
  const users = req.body;

  // if (!error.email || !error.password ||!error.name ) {
  //   return res.status(400).send({message : "Username,email and password are required."});
  // }
  if (error) return res.status(400).json({ error: error.details[0].message });


  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  const password = await bcrypt.hash(req.body.password, salt);
  const {name, email} = req.body;
  const user = new User({
    name,
   email: email.toLowerCase(),
    password,
  });
 
  try {
    const savedUser = await user.save();

    res.json({ error: null, data: { message: "User was registered successfully!", userId: savedUser._id } });

  } catch (error) {
    if (error.code === 11000) {
      return res.send({ status: 'error', error: 'email already exists. Please Login' })
    }
    throw error
  }
}

// Login Controller
const loginController = async (req, res) => {
  // const use = req.body;
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  const user = await User.findOne({ email: req.body.email })


  if (!user) return res.status(400).json({ error: "Invalid email or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);


  if (!validPassword)
    return res.status(400).json({
      message: "Invalid email or password",
      error,
    });

  const token = jwt.sign({
    name: user.name,
    id: user._id,
  },
    "RANDOM-TOKEN",
    { expiresIn: "24h" }
  ); 
  res.header("auth-token", token).send({
    error: null,
    message: "Login Successful",
    user,
    token,
})
}

module.exports = { registerController, loginController }
