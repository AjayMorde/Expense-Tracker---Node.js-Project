const Expense=require('../connections/expense');

const addExpense=async(req,res)=>{
    function isValidData(data) {
        if (data == undefined || data.length === 0)
            return true;
        else {
            return false;
        }
    }
    try{
        const amount = req.body.Amount;                   // from here i extracts  all properties 
        const description = req.body.Description;
        const category = req.body.Category;

        if (isValidData(amount) || isValidData(description) || isValidData(category)) {
            return res.status(400).json({ msg :'add parameters' })
        }

        const expenseValues=await Expense.create({         // here i create a new expense record in my database
            amount : amount ,
            description : description,
            category : category,
            UserId: req.user.id
        })

        res.status(200).json({Success: expenseValues});      
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({failed: "Error Occurred"});
    }
}

module.exports={addExpense}