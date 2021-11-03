//Invoco el servicio mysql
const mysql = require('mysql')

//Ingreso a la BD
const db = mysql.createConnection({
    host:'192.168.200.102',
    port:3306,
    //server:'db',
    user:'root',
    password:'migoni2001',
    database:'monitoreo_db'
});

//conexión en marcha
db.connect(function(err){
    if(err){
        console.log(err)
        return;
    }else{
        console.log("Conexión con la BD exitosa!!")
    }
})

module.exports = db