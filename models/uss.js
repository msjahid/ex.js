const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Role is required!'],
        unique: true
    }
})

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid Email! Try again.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password is too short!']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
})

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid Email! Try again.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password is too short!']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
})

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter a valid Email! Try again.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password is too short!']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }
})

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course Name is required'],
        unique: true,
    },
    code: {
        type: String,
        required: [true, 'Course Code is required'],
        unique: true,
    }
})

adminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    if (!admin) {
      throw Error('incorrect email!');
    }
  
    // const auth = await bcrypt.compareSync(password, admin.password);
    // if (password === admin.password){
    //     return admin
    // }
    // console.log(password);
    // console.log(admin.password);
    if (!password === admin.password) {
      throw Error('incorrect password!');
    }
  
    return admin;
  }

  
studentSchema.statics.login = async function(email, password) {
const student = await this.findOne({ email });
if (!student) {
    throw Error('incorrect email!');
}

// const auth = await bcrypt.compareSync(password, student.password);
// if (password === student.password){
//     return student
// }
// console.log(password);
// console.log(student.password);
if (!password === student.password) {
    throw Error('incorrect password!');
}

return student;
}

teacherSchema.statics.login = async function(email, password) {
    const teacher = await this.findOne({ email });
    if (!teacher) {
        throw Error('incorrect email!');
    }
    
    // const auth = await bcrypt.compareSync(password, teacher.password);
    // if (password === teacher.password){
    //     return teacher
    // }
    // console.log(password);
    // console.log(teacher.password);
    if (!password === teacher.password) {
        throw Error('incorrect password!');
    }
    
    return teacher;
    }

// Creating model objects
const Role = mongoose.model('Role', roleSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Course = mongoose.model('Course', courseSchema);

// Exporting our model objects
module.exports = {
    Student, Admin, Teacher, Role, Course
}


