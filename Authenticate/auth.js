const jwt = require('jsonwebtoken');
const User = require('../connections/user');

const autheticate = async (req, res, next) => {
    try {

        const token=req.header('Authorization');
        // console.log('the token is --------------------------------------------------------------->',token);
        const user=jwt.verify(token,'a46142352jay2352morde5674b784hjfiuye68940sjhhreurh34934i');
        // console.log('userid is---------------------------------------------------------------->',user.userId);
      const getUser= await User.findByPk(user.userId)
            // console.log('=================================>',JSON.stringify(user));
            req.user=getUser;
            next();

        
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({success:false});


    }



}
module.exports={autheticate };