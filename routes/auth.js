const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "KetanMaini@server";
const fetchuser = require("../middleware/fetchuser");


//Route 1
//SignUp using post: "http://localhost:5000/api/auth/signup"
router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).maxTimeMS(30000); // Set timeout to 30 seconds
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      // creting new user
      username: req.body.username,
      email: req.body.email,
      password: secpass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtData = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken: jwtData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occured");
  }
});

//Route 2
//Login using post: "http://localhost:5000/api/auth/login"
router.post("/login", async (req, res) => {
  //sending request and checking for errors & checks for vaild entries
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("No account with this email id exists");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json("Wrong Password");
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtData = jwt.sign(data, JWT_SECRET);
    res.json({ username:user.username, authtoken: jwtData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occured");
  }
});

//Route 3
//getuser using post: "http://localhost:5000/api/auth/getuser"  Login required
router.get('/getuser', fetchuser ,async (req, res) => {
  try{
      const _id=req.user.id;
      const user= await User.findById(_id);
      res.json(user);
  }catch(error){
      console.error(error.message);
      res.status(500).json("Some error occured");
  }
})

//Route 4
//getuser using put: "http://localhost:5000/api/auth/updateuser"  Login required
router.put("/updateuser", fetchuser, async (req, res) => {
  const {email,language, currency, subscription } = req.body;
  try {
    let user= await User.findById(req.user.id);
    if (!user) {
      res.status(401).send("Not found");
    }
    // if (note.user.toString() !== req.user.id) { res.status(401).send("Not aloowed") }
    // note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    const newuser = {};
    if (email) {
      newuser.email = email;
    }
    if (language) {
      newuser.language = language;
    }
    if (currency) {
      newuser.currency = currency;
    }
    if(subscription){
      newuser.subscription=subscription
    }
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: newuser },
      { new: true }
    );
    // user=newuser;
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 5
// delete account using delete: "http://localhost:5000/api/auth/deleteuser"
router.delete('/deleteuser', fetchuser, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({"status":"500","Success":"No account with this email id exists"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({"status":"500","Success":"Wrong Password"});
    }
    user=await User.findOneAndDelete({email});
    res.json({"status":"400","Success":"Account has been deleted"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"status":"500",error});
  }
})

module.exports = router;
