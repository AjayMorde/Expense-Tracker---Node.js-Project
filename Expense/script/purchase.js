document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, // enter the Key ID generated from the dashboard
        "order_id": response.data.order.id,// for one time payment
       //handling a success payment
        "handler": async function (response) {
            const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{ headers: {"Authorization": token}  })

            console.log("==========================================================================================================================================")
            alert('You are a Premium User Now')
            document.getElementById('rzp-button1').style.visibility="hidden"
            document.getElementById('message').innerHTML="You are a premium user";
            // localStorage.setItem('isadmin',true);
             localStorage.setItem('token', res.data.token)
             showLeaderboard()
         

        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', async function (response) {
        console.log(response);
        alert('Something went wrong');

   
        const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
            order_id: options.order_id,
            payment_id: response.error.metadata.order_id,
            status: 'FAILED',
        }, { headers: { "Authorization": token } });

        console.log(res);
    });
}



