const jwt = require('jsonwebtoken');
const { Role } = require('../models/uss');

// body based request
const authUser = (permission) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if(permission.includes(userRole)) {
            next();
        } else {
            return res.status(400).json("You dont have permission to access this page");
        }
    }
}
// header based request which is perfect for frontend developers

const authAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1]; // Authorization: Bearer[0] token[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user != '62cf7bdac856c308cb6d1608') {
            res.json({message: 'Permission denied.' });
        } else {
            next();
        }
    }catch (err){
        console.log(err);
        res.status(400).json({ message: 'Permission denied.' });
      }
}

const authStudent = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1]; // Authorization: Bearer[0] token[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user != '62cf7be3c856c308cb6d160a') {
            res.json({message: 'Permission denied.' });
        } else {
            next();
        }
    }catch (err){
        console.log(err);
        res.status(400).json({ message: 'Permission denied.' });
      }
}


module.exports = {
    authAdmin, authStudent
}