const Expense = require('../connections/expense');

const getAllExpense = async (req, res) => {
    try {
        const data = await Expense.findAll();         

        res.status(200).json({ data: data })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ failed: "Error Occurred" });
    }
}

module.exports = { getAllExpense }