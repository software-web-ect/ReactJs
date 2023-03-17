import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser= async (req, res) =>{
try {
    const response = await Users.findAll({
        attributes:['uuid','name','email','role']
    });
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
}
export const getUserId= async (req, res ) =>{
    try {
        const response = await Users.findAll({
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
        res.status(400).json({msg: "gagal"});
    }
}

export const updateUser = async (req, res) =>{
    const User = await Users.findOne({
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
        await Users.update({
            name:name,
            email: email,
            passsword: hashPassword,
            role: role
        },{
            where:{
                id: Users.id
            }
        });
        res.status(200).json({msg: "berhasil terupdate"});
    } catch (error) {
        res.status(400).json({msg: "gigil"});
    }
}

export const deleteUser =async (req, res) =>{
    const User = await Users.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!Users) return res.status(404).json({msg: "user tidak di temukan"});
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