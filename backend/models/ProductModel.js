import { Sequelize }  from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Products = db.define ('Product',{
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
    price :{
        type:DataTypes.INTEGER,
        allownull:false,
        validate:{
            notEmpety: true,
        }
    },
    userid :{
        type:DataTypes.INTEGER,
        allownull:false,
        validate:{
            notEmpety: true,
        }
    }
},{
    freezeTableName:true
});

// Users.HasMany(Products);
// Products.belongsTo(Users, {foreignKey:'userid'});

export default Products;




