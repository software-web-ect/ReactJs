import {  Sequelize }  from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define ('User',{
    uuid:{
        type:DataTypes.STRING,
        defaultvalue:DataTypes.UUIDV4,
        allownull:false,
        validate:{
            notEmpety: true,
        }
    },
    name:{
        type:DataTypes.STRING,
        allownull:false,
        validate:{
            notEmpety: true,
            len: [3, 100]
        }
    },
    email :{
        type:DataTypes.STRING,
        allownull:false,
        unique: true,
        validate:{
            notEmpety: true,
            isEmail: true
        }
    },
    password :{
        type:DataTypes.STRING,
        allownull:false,
        validate:{
            notEmpety: true,
        }
    },
    role :{
        type:DataTypes.STRING,
        allownull:false,
        validate:{
            notEmpety: true,
        }
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Users;




