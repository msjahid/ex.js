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

adminSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    if (!admin) {
      throw Error('incorrect email!');
    }
    // console.log(password);
    // console.log(admin.password);
    if (!password === admin.password) {
      throw Error('incorrect password!');
    }
  
    return admin;
  }


// Creating model objects
const Role = mongoose.model('Role', roleSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);

// Exporting our model objects
module.exports = {
    Student, Admin, Teacher, Role
}


