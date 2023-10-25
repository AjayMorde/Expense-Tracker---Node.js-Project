const Expense = require('../connections/expense');


const deleteExpense = async (req, res) => {
  try {
    const userId = req.params.id;    
    

    if (userId== undefined || userId.length === 0) {
      return res.status(400).json({ success: false });
  }
    
    
    let destroy = await Expense.destroy({ where: { id: userId, UserId: req.user.id } });

    res.status(200).json({ Data: destroy });
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ failed: "Error Occurred" });
  }
}

module.exports =  {deleteExpense}