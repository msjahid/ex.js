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

module.exports = {
    authUser
}