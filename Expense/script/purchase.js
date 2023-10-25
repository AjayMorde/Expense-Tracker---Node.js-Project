document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
        "order_id": response.data.order.id,// For one time payment
        // This handler function will handle the success payment
        "handler": async function (response) {
            const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })

            console.log(res)
            alert('You are a Premium User Now')
            document.getElementById('message').style.display = 'block';
             localStorage.setItem('token', res.data.token)
             showPremiumuserMessage()
             showLeaderboard();

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
