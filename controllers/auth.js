const User = require('../modelSchema/userSchema');
const { registerValidation, loginValidation } = require('../validation/registerValidation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register Controller
const registerController = async (req, res) => {

    const { error } = registerValidation(req.body);
    
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isEmailExist = await User.findOne({ email: req.body.email });

    // email already registered
    if (isEmailExist)
        return res.status(400).json({ error: "Email already exists" });

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password,
    });
    try {
        const savedUser = await user.save();
        res.json({ error: null, data: { userId: savedUser._id } });
    } catch (error) {
        res.status(400).json({ error });
    }
}

TOKEN_SECRET ='***'
const loginController = async (req, res) => {

  const { error } = loginValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email});

  if (!user) return res.status(400).json({ error: "Email not found" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      message: "Login Successful",
      user,
      token,
    },
  });
}



module.exports = { registerController,loginController }