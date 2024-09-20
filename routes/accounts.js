const express = require("express");
const Accounts = require("../models/accounts");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// Route 1
// Fetch all accounts using GET http://localhost:5000/api/accounts/fetchallaccounts
router.get("/fetchallaccounts", fetchuser, async (req, res) => {
  try {
    const acc = await Accounts.find({ user_id: req.user.id });
    res.json(acc);
  } catch {
    console.error("any error");
    res.status(500).json("Some error occured");
  }
});

// Route 2
// add accounts using post: "http://localhost:5000/api/accounts/addaccount"
router.post("/addaccount", fetchuser, async (req, res) => {
  try {
    const { name, balance, cardnum,color } = req.body;
    const account = new Accounts({
      name,
      balance,
      cardnum,
      color,
      user_id: req.user.id,
    });

    const savedAccount = await account.save();
    res.json(savedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 3
// Get specific account using GET "http://localhost:5000/api/accounts/getaccount/:id"
router.get("/getaccount/:id", fetchuser, async (req, res) => {
  // const { title, description, tag } = req.body;
  try {
    let account = await Accounts.findById(req.params.id);
    if (!account) {
      res.status(401).send("Not found");
    }
    // if (note.user.toString() !== req.user.id) { res.status(401).send("Not aloowed") }
    // note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 4
// Update notes using put: "http://localhost:5000/api/accounts/updateaccount/:id"
router.put("/updateaccount/:id", fetchuser, async (req, res) => {
  const { name, balance, cardnum,color } = req.body;
  try {
    let account = await Accounts.findById(req.params.id);
    if (!account) {
      res.status(401).send("Not found");
    }
    // if (note.user.toString() !== req.user.id) { res.status(401).send("Not aloowed") }
    // note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    const newaccount = {};
    if (name) {
      newaccount.name = name;
    }
    if (balance) {
      newaccount.balance = balance;
    }
    if (cardnum) {
      newaccount.cardnum = cardnum;
    }
    if(color){
      newaccount.color=color
    }
    account = await Accounts.findByIdAndUpdate(
      req.params.id,
      { $set: newaccount },
      { new: true }
    );
    res.json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});


// Route 5
// delete account using delete: "http://localhost:5000/api/accounts/deleteaccount/:id"
router.delete('/deleteaccount/:id', fetchuser, async (req, res) => {
    try{
    let account = await Accounts.findById(req.params.id);
    if (!account) { res.status(401).send('Not found') }
    // if (note.user.toString() !== req.user.id) { res.status(401).send("Not aloowed") }

    account= await Accounts.findByIdAndDelete(req.params.id);
    res.json({"Success":"Account has been deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occurred");
    }
})

module.exports = router;
