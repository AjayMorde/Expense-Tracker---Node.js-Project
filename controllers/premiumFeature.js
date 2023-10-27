const Expense = require('../connections/expense');
const Users = require('../connections/user');

const getUserLeaderboard = async (req, res) => {
    try {
        const users = await Users.findAll();
        const expenses = await Expense.findAll();
        // console.log('============================================>>>>',expenses)

        const userAggregatedExpenses = {};

        expenses.forEach((expense) => {
            if (userAggregatedExpenses[expense.UserId]) {
                console.log('============================>',userAggregatedExpenses[expense.UserId])
                userAggregatedExpenses[expense.UserId] =  userAggregatedExpenses[expense.UserId] +expense.amount;
            } else {
                userAggregatedExpenses[expense.UserId] = expense.amount;
            }
        });
        console.log('========================================>',userAggregatedExpenses)
        var userLeaderboardDetails=[];
        users.forEach((user)=>{
            userLeaderboardDetails.push({name:user.Name,total_cost:userAggregatedExpenses[user.id] ||0})
        })

        // console.log('=============================================>',userLeaderboardDetails);
         console.log('================================================================================>',userLeaderboardDetails)
        userLeaderboardDetails.sort((a,b)=>b.total_cost-a.total_cost)
        res.status(200).json({ userLeaderboardDetails });
    } catch (err) {
        res.status(500).json({ err });
    }
}

module.exports = { getUserLeaderboard };
