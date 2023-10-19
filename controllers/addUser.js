const Users=require('../connections/user');

function isDataValid(data){
    if(data==undefined || data.length===0){
       return true;
    }else{
        return false;
    }
}

const addUser = async (req, res) => {

    try {
        const Name= req.body.Name;
        const Email = req.body.Email;
        const Password= req.body.Password;
        
       if(isDataValid(Name)||isDataValid(Email)||isDataValid(Password)){
        res.status(400).json({err:'Bad Parameters'})
       }
       if(Password.length<=6){
        res.status(400).json({err:'Bad Parameters'})
       }
      
        
        const newUser = await Users.create({       
            Name,
            Email,
            Password,
            });

        res.status(200).json({ newUser }); 
    } catch (error) {
        console.error('Error:', error);
           res.status(500).json({ error: 'An error occurred while adding the user' }); 
    }
};
   module.exports={addUser}
   