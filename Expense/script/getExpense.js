
const btn = document.getElementById("expenseBtn");
btn.addEventListener("click", getExpense);

async function getExpense() {
    try {
        const token=localStorage.getItem("token")
        const res = await axios.get("http://localhost:3000/get-expense/expense", { headers:{"Authorization":token} });

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
                <span class="label">Category:</span> <span class="value">${expense.category}</span>
            </div>
            <div class="property">
                <span class="label">Description:</span> <span class="value">${expense.description}</span>
            </div>
        `;
                deletebtn.textContent = "Delete";


                deletebtn.addEventListener("click", async () => {
                    try {
                        const token=localStorage.getItem("token");
                        const res = await axios.delete(`http://localhost:3000/delete-expense/delete/${expense.id}`,{ headers: {"Authorization" : token} });

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
            console.error("something went wrong ");
        }
    } catch (error) {
        console.error("something went wrong ", error);
    }
}
