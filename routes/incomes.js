const express = require("express");
const Incomes = require("../models/incomes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//Route 1 Fetch all Incomes using GET http://localhost:5000/api/incomes/fetchallIncomes
router.get("/fetchallincomes", fetchuser, async (req, res) => {
    try {
        const inc = await Incomes.find({ user_id: req.user.id });
        res.json(inc);
    } catch {
        console.error("any error");
        res.status(500).json("Some error occured");
    }
});


// Route 2
// add Income using post: "http://localhost:5000/api/incomes/addincome"
router.post("/addincome", fetchuser, async (req, res) => {
    try {
        const { name, amount, category, bank_account, note } = req.body;
        const inc = new Incomes({
            name,
            amount,
            category,
            bank_account,
            note,
            user_id: req.user.id,
        });

        const savedInc = await inc.save();
        res.json(savedInc);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occurred");
    }
});


// Route 3
// Get specific Income using GET "http://localhost:5000/api/incomes/getincome/:id"
router.get("/getincome/:id", fetchuser, async (req, res) => {
    try {
        let inc = await Incomes.findById(req.params.id);
        if (!inc) {
            res.status(401).send("Not found");
        }
        res.json(inc);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occurred");
    }
});


// Route 4
// Update Incomes using put: "http://localhost:5000/api/incomes/updateincome/:id"
router.put("/updateincome/:id", fetchuser, async (req, res) => {
    const { name, amount, category, bank_account, note } = req.body;
    try {
        let inc = await Incomes.findById(req.params.id);
        if (!inc) {
            res.status(401).send("Not found");
        }
        const newincome = {};
        if (name) {
            newincome.name = name;
        }
        if (amount) {
            newincome.amount = amount;
        }
        if (category) {
            newincome.category = category;
        }
        if (bank_account) {
            newincome.bank_account = bank_account;
        }
        if (note) {
            newincome.note = note;
        }
        inc = await Incomes.findByIdAndUpdate(
            req.params.id,
            { $set: newincome },
            { new: true }
        );
        res.json(inc);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occurred");
    }
});

// Route 5
// delete expense using delete: "http://localhost:5000/api/incomes/deleteincome/:id"
router.delete('/deleteincome/:id', fetchuser, async (req, res) => {
    try {
      let inc = await Incomes.findById(req.params.id);
      if (!inc) { res.status(401).send('Not found') }
      inc = await Incomes.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Income has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Some error occurred");
    }
  })
  module.exports = router;
