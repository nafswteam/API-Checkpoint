const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userData = require("./user.data"); 
// Require the dotenv module so that our env data can be injected into our project
const users = [
    {name: "Mary", age: 20, email: "marya@gram.com"},
    {name: "Edwards", age: 34, email: "edwards@gram.com"},
    {name: "loveth", age: 45, email: "loveth@gram.com"}
]
const dotenv = require("dotenv");
const User = require("./models/User");
const dotEnvPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, "config", ".envProduction") : path.join(__dirname, "config", ".env")
dotenv.config({path: dotEnvPath});

// initializing the express module
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

// This route create bulk users in our database using pre generated data.
app.get("/seed", async (req, res) => {
    const users = await User.create(userData);
    if(users){
        res.status(201).json({users, message: "Users successfully created."});
    }
})

// requirement TEN (10) 

//  GET :  RETURN ALL USERS 
app.get("/", async (req,res) => {
    try {
        const users = await User.find();
        if(users) {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).send({
            error: error.name,
            message: error.message
        });
    }
});

//  POST :  ADD A NEW USER TO THE DATABASE 
app.post("/", async (req,res) => {
    try {
        const userObj = new User(req.body);
        const user = await userObj.save();
        if(user) {
            res.status(201).json(user) 
        }
    } catch (error) {
        res.status(500).send({
            error: error.name,
            message: error.message
        });
    }
})

//  PUT : EDIT A USER BY ID 
app.put("/:id", async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if(user) {
            res.status(201).json({user, message: "Update operation was successful"}) 
        }
    } catch (error) {
        res.status(500).send({
            error: error.name,
            message: error.message
        });
    }
})

//  DELETE : REMOVE A USER BY ID 
app.delete("/:id", async (req,res) => {
    try {
        const id = req.params.id;
        // Checks if user is in DB
        const user = await User.findById(id);
        if(user) {
            // Delete and return the deleted user
            const deletedUser = await User.findByIdAndDelete(id);
            if(deletedUser) {
                res.status(201).json({user, message: "Delete operation was successful"}) 
            }
        }else {
            res.status(404).json({message: `User wit id ${id} not in Database`})
        }
        
    } catch (error) {
        res.status(500).send({
            error: error.name,
            message: error.message
        });
    }
});


// A function that starts our api and database server
async function startApp(port){
    try {
       const connected = await  mongoose.connect(DB_URL)
       if(connected){
        console.log("🚀🚀🚀🚀Database connected.")
       }
        app.listen(port, console.log("🚀🚀🚀🚀App is running on port", port))
    
    } catch (error) {
       console.log({
        error: error.name,
        message: error.message
       }) 
    }
}

// Start the server
startApp(PORT);