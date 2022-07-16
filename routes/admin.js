const { Course, Student, Admin, Teacher, Role } = require('../models/uss');
const router = require('express').Router();
const {authUser} = require('../controllers/authController');
const jwt = require('jsonwebtoken');

//home get
router.get('/', (req, res) => {
    res.json({Hello: "Chudur Budur University"})
})

//roles api
router.post('/roles', async (req, res) => {
    const { title } = req.body;

    try {
        const role = await Role.create({title});
        res.status(200).json(role);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.post('/admin', async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {
        const admin = await Admin.create({name, email, password, address, role});
        res.status(200).json(admin);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.post('/student', async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {
        const student = await Student.create({name, email, password, address, role});
        res.status(200).json(student);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
})


router.get('/admin', (req, res) => {
    Admin.find().populate('role')
    .then(data => {
        res.status(200).json(data);
        // data.forEach(result => result.role.title);
    })
    .catch(error => {
        res.json(error);
    })
})

router.get('/student', (req, res) => {
    Student.find().populate('role')
    .then(data => {
        res.status(200).json(data);
        // data.forEach(result => result.role.title);
    })
    .catch(error => {
        res.json(error);
    })
})

//authUser(["Admin", "Teacher", "Student"])
router.get('/course', (req, res) => {
    Course.find()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(400).json({error: error.message});
    })
})

router.post('/course', async (req, res) => {
    const {name, code} = req.body;
    try {
        const course = await Course.create({name, code});
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.post('/login-admin', async (req, res) => {
    const { email, password} = req.body;
    try {
        const admin = await Admin.login(email, password);
        const token = jwt.sign({
            name: admin.name, 
            user: admin.role._id
        }, process.env.JWT_SECRET, {
            expiresIn: '20s'
        });
        res.status(200).json({ 
            "admin": 'Hey madafucka admin!',
            "auth_token": token
        });
    }catch (error){
        res.status(400).json({ error: error.message });
    }
})

router.post('/login-student', async (req, res) => {
    const { email, password} = req.body;
    try {
        const student = await Student.login(email, password);
        const token = jwt.sign({
            name: student.name, 
            user: student.role._id
        }, process.env.JWT_SECRET, {
            expiresIn: '40s'
        });
        res.status(200).json({ 
            "student": 'Hey madafucka student!',
            "auth_token": token
        });
    }catch (error){
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;