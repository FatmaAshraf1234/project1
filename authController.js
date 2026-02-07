const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User, users} = require("../models/userModel");
// register 
exports.register = async (req,res) =>{
    const {name , email , password }= req.body;
    // التحقق لو المستخدم موجود
    const existingUser = users.find(u=> u.email === email);
    if (existingUser){
        return res.status(400).json({message: " User already exists"});
    }
    //تشفير الباسورد 
    const hashedPassword = await bcrypt.hash(password,10);
    // انشاء المستخدم
    const newUser = new User(name, email, hashedPassword);
    users.push(newUser);
    res.status(201).json({message: "User registered successfully", user: {name,email}});
};
//login
exports.login = async(req,res)=>{
    const {email,password} = req.body;
    // التحقق من وجود المستخدم
    const user = users.find(u =>u.email === email);
    if(!user){
        return res.status(400).json({message: "Invalid email or password"});
    }
    // التحقق من كلمه السر 
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid email or password"});
    }
    //انشاء jwt
    const token = jwt.sign({email: user.email}, "MY_SECRET_KEY", {expiresIn : "1h"});
    res.json({message: "Login successful", token});
};