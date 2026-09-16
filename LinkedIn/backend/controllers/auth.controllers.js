import  genToken  from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => { 
    try{
        let{ firstName, lastName,userName, email, password } = req.body;
        let existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message: "email already exists !"});
        }
        let existUserName = await User.findOne({userName});
        if(existUserName){
            return res.status(400).json({message: "username already exists !"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "password must be atleast 6 characters long"});
        }

        let hassedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName, lastName, userName, email, password: hassedPassword
        })

        let token = await genToken(user._id);

        res.cookie("token", token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production" ? true : false
        })

        return res.status(201).json(user)

    }catch(error){
        console.log("SIGNUP ERROR:", error);
        return res.status(500).json({message: "signup error"});
    }

}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "user  does not exists !"});
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid password !"});
        }

        let token = await genToken(user._id);

        res.cookie("token", token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production" ? true : false
        })
        return res.status(201).json(user)

    }catch(error){
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({message: "login error"});
    }
}

export const logOut = async (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message: "logout successful"});
    }catch(error){
        console.log("LOGOUT ERROR:", error);
        return res.status(500).json({message: "logout error"});
    }
}