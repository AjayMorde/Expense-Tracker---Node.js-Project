
function showPremiumUserMessage() {
    document.getElementById('rzp-button1').style.visibility = "hidden"; 
    document.getElementById('message').innerHTML = "You are a premium user";
}

    const inputElement = document.createElement('input');
    inputElement.type = 'button';
    inputElement.value = 'Show Leaderboard';

    inputElement.onclick = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/premiumuser/showLeaderBoard', { headers: { "Authorization": token } });

        const userLeaderboardArray=response.data;
        console.log('=====================================>', userLeaderboardArray);
        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML = '<h1> Leader board</h1>';

        userLeaderboardArray.forEach((userDetails) => {
            leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total-Expense - ${userDetails.total_cost}`;
        });
    }
    document.getElementById('message').appendChild(inputElement);
    function showLeaderboard() {
        const inputElement = document.createElement('input');
        inputElement.type = 'button';
        inputElement.value = 'Show Leaderboard';
    
        inputElement.onclick = async () => {
            const token = localStorage.getItem('token');
            const userLeaderboardArray = await axios.get('http://localhost:3000/premiumuser/showLeaderBoard', { headers: { "Authorization": token } });
            console.log('=====================================>', userLeaderboardArray);
            var leaderboardElem = document.getElementById('leaderboard');
            leaderboardElem.innerHTML = '<h1> Leader board</h1>';
    
            userLeaderboardArray.data.userLeaderboardDetails.forEach((userDetails) => {
                leaderboardElem.innerHTML += `<li>Name - ${userDetails.name} Total-Expense - ${userDetails.total_cost}</li>`;
            });
        }
        document.getElementById('message').appendChild(inputElement);
    }
    



// taken by google inbuilt code this is ....
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


document.addEventListener('DOMContentLoaded', function () {
    getExpense();
});

async function getExpense() {
    try {
        const token = localStorage.getItem("token");
        // const isadmin=localStorage.getItem("isadmin");
        const decodedToken = parseJwt(token);
        console.log(decodedToken)
        const ispremiumuser = decodedToken.ispremiumuser
        if (ispremiumuser) {
            showPremiumUserMessage();
            showLeaderboard()
        }


        const res = await axios.get("http://localhost:3000/get-expense/expense", { headers: { "Authorization": token } });

        if (res.status === 200) {
            const elist = document.getElementById("expenses-list");
            elist.innerHTML = "";

            const expenses = res.data.data;

            expenses.forEach((expense) => {
                const eItem = document.createElement("div");
                const deletebtn = document.createElement("button");
                deletebtn.className = 'delete';
                eItem.innerHTML = `
            <div class="property">
                <span class="label">Amount:</span> <span class="value">${expense.amount}</span>
            </div>
            <div class="property">
                <span class "label">Category:</span> <span class="value">${expense.category}</span>
            </div>
            <div class="property">
                <span class="label">Description:</span> <span class="value">${expense.description}</span>
            </div>
        `;
                deletebtn.textContent = "Delete";

                deletebtn.addEventListener("click", async () => {
                    try {
                        const token = localStorage.getItem("token");
                        const res = await axios.delete(`http://localhost:3000/delete-expense/delete/${expense.id}`, { headers: { "Authorization": token } });

                        if (res.status === 200) {
                            eItem.remove();
                        } else {
                            console.error("Error deleting expense");
                        }
                    } catch (err) {
                        console.error('err');
                    }
                });

                eItem.appendChild(deletebtn);
                elist.appendChild(eItem);
            });
        } else {
            console.error("something went wrong");
        }
    } catch (error) {
        console.error("something went wrong", error);
    }
}
