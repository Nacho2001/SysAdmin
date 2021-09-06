const mysql = require('mysql')

const db = mysql.createConnection({
    host:'localhost',
    user:'root', 
    password:'',
    database:'apidb'
});

//acá se pone en marcha la conexion
db.connect(function(err){
    if (err){
        console.log("Error de conexión")
        return;
    }else{
        console.log('La conexión fue exitosa!')
    }
})

module.exports = db;
