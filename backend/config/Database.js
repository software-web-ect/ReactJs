import  Sequelize  from "sequelize";

const  db = new Sequelize('ekinerja-master','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;