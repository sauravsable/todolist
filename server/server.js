const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(express.json());

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/todolist').then(()=> console.log("Database connected"))
.catch(err => console.log(err));

//use cors
app.use(cors());

const TodoItemRoute = require('./routes');

app.use('/',TodoItemRoute);


//Listen to the port 3000
app.listen("5500",()=>{
    console.log("server started");
})