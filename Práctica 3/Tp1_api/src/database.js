const mysql = require('mysql')

//Busqueda de la base de datos
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'api-tp1'
});
//Notifica si servidor cargó bien o si algo salió mal
db.connect(function(err){
    if(err){
        console.log('Ocurrió un error')
        return;
    }else{
        console.log('Conexión exitosa!!')
    }
})

module.exports = db