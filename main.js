require('dotenv').config()

const bodyParser = require('body-parser');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());

//app router
app.use('/', require('./routes/admin'));


mongoose.connect(process.env.MONGO_DB).then(() => {
    app.listen(process.env.PORT, () =>{
        console.log('server and database running');
    })
}).catch((error) => {
    console.error(error);
})