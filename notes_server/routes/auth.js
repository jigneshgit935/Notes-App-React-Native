const router = require('express').Router();

const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(400).json({ message: 'User not found', satus: false });

    const validatePassword = req.body.password == user.password;
    !validatePassword &&
      res.status(400).json({ message: 'Invalid Credentials', status: false });

    res
      .status(200)
      .json({ user, message: 'Logged in successfully', status: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Something went wrong', status: false });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const data = await user.save();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
