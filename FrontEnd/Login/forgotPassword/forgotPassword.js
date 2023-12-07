async function forgetPassword(e){
    e.preventDefault();
    
  try{
    const details={
        email: e.target.email.value
    }
    const response= await axios.post("http://34.235.120.189/password/forgotpassword",  details);
    if(response.status === 200)     
    {    
      
        alert("Reset Link Has Been Sent To Your Mail!")
    }
  }
  catch(err)
  {
    // console.log(err);
    if(err.response.status== 404)
    {
      alert(`${err.response.data.message}`);
       
    } else{
      alert(`${err}`);
      }
  }
}
