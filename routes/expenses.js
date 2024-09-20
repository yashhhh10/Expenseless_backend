const express = require("express");
const Expenses = require("../models/expenses");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//Route 1 Fetch all expenses using GET http://localhost:5000/api/expenses/fetchallexpenses
router.get("/fetchallexpenses", fetchuser, async (req, res) => {
  try {
    const exp = await Expenses.find({ user_id: req.user.id });
    res.json(exp);
  } catch {
    console.error("any error");
    res.status(500).json("Some error occured");
  }
});

// Route 2
// add expenses using post: "http://localhost:5000/api/expenses/addexpenses"
router.post("/addexpenses", fetchuser, async (req, res) => {
  try {
    const { name, amount, category, bank_account, note } = req.body;
    // // Check if the note with the same title, description, and tag already exists for the user
    //   const existing = await Expenses.findOne({ name, balance, user_id: req.user.id });
    // if (existingAccount) {
    //     return res.status(400).json({ error: "Account with the same name and balance already exists." });
    // }

    const expense = new Expenses({
      name,
      amount,
      category,
      bank_account,
      note,
      user_id: req.user.id,
    });

    const savedExpense = await expense.save();
    res.json(savedExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 3
// Get specific Expense using GET "http://localhost:5000/api/expenses/getexpense/:id"
router.get("/getexpense/:id", fetchuser, async (req, res) => {
  try {
    let expense = await Expenses.findById(req.params.id);
    if (!expense) {
      res.status(401).send("Not found");
    }
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 4
// Update Expenses using put: "http://localhost:5000/api/accounts/updateexpense/:id"
router.put("/updateexpense/:id", fetchuser, async (req, res) => {
  const { name, amount, category, bank_account, note } = req.body;
  try {
    let expense = await Expenses.findById(req.params.id);
    if (!expense) {
      res.status(401).send("Not found");
    }
    const newexpense = {};
    if (name) {
      newexpense.name = name;
    }
    if (amount) {
      newexpense.amount = amount;
    }
    if (category) {
      newexpense.category = category;
    }
    if (bank_account) {
      newexpense.bank_account = bank_account;
    }
    if (note) {
      newexpense.note = note;
    }
    expense = await Expenses.findByIdAndUpdate(
      req.params.id,
      { $set: newexpense },
      { new: true }
    );
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
});

// Route 5
// delete expense using delete: "http://localhost:5000/api/expenses/deleteexpense/:id"
router.delete('/deleteexpense/:id', fetchuser, async (req, res) => {
  try {
    let expense = await Expenses.findById(req.params.id);
    if (!expense) { res.status(401).send('Not found') }
    expense = await Expenses.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Expense has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Some error occurred");
  }
})
module.exports = router;
