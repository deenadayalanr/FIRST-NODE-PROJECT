const mysql=require('mysql2/promise');

const data=mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"Node_project"
});

module.exports=data;