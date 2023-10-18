const Users=require('../connection/user');
const addUser = async (req, res) => {
    try {
        const Name= req.body.Name;
        const Email = req.body.Email;
        const Password= req.body.Password;
        

        
        const newUser = await Users.create({       
            Name,
            Email,
            Password,
            
            
            
        });

        res.status(200).json({ newUser }); 
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user' }); 
    }
};
   module.exports={addUser}
   review