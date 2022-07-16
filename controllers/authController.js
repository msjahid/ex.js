const jwt = require('jsonwebtoken');
const { Role } = require('../models/uss');

const auth = (permission) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1]; // Authorization: Bearer[0] token[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await Role.findById(decoded.user).populate('title')
        .then(data => {
            if(!permission.includes(data.title)) {
                res.json({message: 'Permission denied.' });
            } else {
                next()
            }
        })
    }catch (err){
        console.log(err);
        res.status(400).json({ message: 'Permission denied.' });
      }
    }
    
}

module.exports = {
    auth
}