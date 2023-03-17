import User from "../models/UserModel.js";
import argon2 from "argon2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser= async (req, res) =>{
try {
    const response = await User.findAll({
        attributes:['uuid','name','email','role']
    });
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
}
export const getUserId=async (req, res ) =>{
    try {
        const response = await User.findAll({
            attributes:['uuid','name','email','role'],
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const createUser =async (req, res) =>{
   const {name, email, password, confpassword, role} = req.body;
    if( password !== confpassword) return res.status(400).json({msg: " password dan confirmasi password salah"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name:name,
            email: email,
            passsword: hashPassword,
            role: role
        })
        res.status(201).json({msg: "berhasil"});
    } catch (error) {
        res.status(400).json({msg: "gigil"});
    }
}

export const updateUser = async (req, res) =>{
    const User = await User.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!User) return res.status(404).json({msg: "user tidak di temukan"});
    const {name, email, password, confpassword, role} = req.body;
    let hashPassword;
    if(password==="" || password || null ){
        hashPassword = User.passsword
    }  else{
        hashPassword = await argon2.hash(password)
    }
    if( password !== confpassword) return res.status(400).json({msg: " password dan confirmasi password salah"});
    try {
        await User.update({
            name:name,
            email: email,
            passsword: hashPassword,
            role: role
        },{
            where:{
                id: User.id
            }
        });
        res.status(200).json({msg: "berhasil terupdate"});
    } catch (error) {
        res.status(400).json({msg: "gigil"});
    }
}

export const deleteUser =async (req, res) =>{
    const User = await User.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!User) return res.status(404).json({msg: "user tidak di temukan"});
    try {
        await User.destroy({
            where:{
                id: User.id
            }
        });
        res.status(200).json({msg: "berhasil delete"});
    } catch (error) {
        res.status(400).json({msg: "gigil"});
    }
}
export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}