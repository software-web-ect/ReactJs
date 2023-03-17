import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login =async (req, res) =>{
    const User = await Users.findOne({
        where:{
            email:req.body.email
        }
    });
    if(!Users) return res.status(404).json({msg: "user tidak di temukan"});
    const match = await argon2.verify(Users.password, req.body.password);
    if(!match) return res.status(404).json({msg: "Wrong"});
    req.session.Userid = Users.uuid
    const uuid = Users.uuid;
    const name = Users.name;
    const email = Users.email;
    const role = Users.role;
    res.status(200).json(uuid, name, email,role);
}

export const Me = async (req, res) =>{
    if(!req.session.Userid){
        return res.status(401).json({msg: "Mohon login"});
    }
    const User = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where : {
            uuid : req.session.Userid
        }
    });
    if(!Users) return res.status(404).json({msg: "user tidak di temukan"});
    res.status(200).json(Users); 
}
