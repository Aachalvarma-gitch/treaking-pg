const db = require("../db")
const bcrypt = require('bcryptjs')
const sendEmail = require("./../utils/email")

const {differenceInSeconds}=require("date-fns")
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // node validation
        const query=`SELECT * FROM users WHERE email=$1`
        const email_val=[email]
        const {rows}=await db.query(query,email_val)
        if (rows.length>0) {
            return res.status(401).json({message:"email already register"})
        }
        const hash = await bcrypt.hash(password, 10)

        const q = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)"
        const value = [name, email, hash]
        await db.query(q, value)
        await sendEmail({
            to:email,
            subject:'welcome',   
            message:"welcome to treaker fest"})
        res.json({ message: "register success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithEmailAndPAssword = async (req, res) => {
    try {
        
        const{email,password}=req.body
        const q=`SELECT * FROM users WHERE email=$1`
        const value=[email]
        const {rows}=await db.query(q,value)
        if (rows.length===0) {
            return res.status(401).json({message:"invalid email"})
        }
        const user=rows[0]
        const verify=await bcrypt.compare(password,user.password)
        if (!verify) {
            return res.status(401).json({message:"invalid password"})
        }
        if (user.isActive===false) {
            return res.status(401).json({message:"account blocked by admin"})
        }

        res.json({ message: "login success",result:{id:user.id,email:user.email,name:user.name} })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithOTP = async (req, res) => {
    try {
        const {email}=req.body
const q=`SELECT * FROM users WHERE email=$1`
        const value=[email]
        const {rows}=await db.query(q,value)
        if (rows.length===0) {
            return res.status(401).json({message:"invalid email"})
        }
        const otp=Math.floor(1000+(Math.random()*999))
        const string_otp=otp.toString()
        const hashOtp=await bcrypt.hash(string_otp,10)
         const query = "UPDATE users SET otp=$1, otpSendOn=$2 WHERE id=$3"
         const updateValue=[hashOtp,new Date(),rows[0].id]
         await db.query(query,updateValue)
        await sendEmail({
            to:email,
            subject:"your login otp",
            message:`your otp is ${otp}`
        })
        res.json({ message: "otp send success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const verifyOTP = async (req, res) => {
    try {
        const {email,otp}=req.body
        const q=`SELECT * FROM users WHERE email=$1`
        const value=[email]
        const {rows}=await db.query(q,value)
        if (rows.length===0) {
            return res.status(401).json({message:"invalid email"})
        }
        const[users]=rows
        const second=differenceInSeconds(new Date(),users.otpsendon)
        if (second>60) {
            await db.query("UPDATE users SET otp=$1 WHERE id=$2",["",users.id])
            return res.status(401).json({message:"otp expire"})
        }
        const verify=await bcrypt.compare(otp,users.otp)
        if (!verify) {
           return res.status(401).json({message:"invalid otp"})  
       }
       await db.query("UPDATE users SET otp=$1 WHERE id=$2",["",users.id])
        res.json({ message: "login success",result:{
            id:users.id,
            name: users.name,
            email:users.email,
            mobile:users.mobile,
        } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithGoogle = async (req, res) => {
    try {
        

        res.json({ message: "login success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = {registerUser, signinWithEmailAndPAssword,signinWithGoogle,signinWithOTP,verifyOTP }
