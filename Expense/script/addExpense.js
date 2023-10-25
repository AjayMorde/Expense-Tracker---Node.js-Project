let amount = document.querySelector('#amount');
let description = document.querySelector('#description');
let myForm = document.querySelector('#my-form');
let category = document.querySelector('#category');



myForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if (amount.value === '' || description.value === '' || category.value === '') {
        alert('Please enter all fields');
    }
    else {

        const details = {
            Amount: amount.value,
            Description: description.value,
            Category: category.value,
        };
        const token=localStorage.getItem("token")
        axios.post("http://localhost:3000/add-expense/expense", details, { headers: {"Authorization" : token} }).
            then(({ data }) => {
                amount.value='';
                description.value='';
                category.value='';
                const ID = data.Success.id
                console.log("this is the ucces is---------------------------------------->"+data.Success.id)
                // addonedetail(ID);
                alert('Details Successfully Saved!');
            })
            .catch((err) => {
                console.error(err);
                alert("Duplicate Entry Found, Please Register Again!")
            });
    }
}
