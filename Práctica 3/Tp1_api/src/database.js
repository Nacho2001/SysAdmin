const mysql = require('mysql')

const db = mysql.createConnection({
    host='localhost',
    user='root',
    password='',
    database='api-tp1'
});

db.connect(function(err){
    if(err){
        console.log('Ocurrió un error')
        return;
    }else{
        console.log('Conexión exitosa!!')
    }
})

module.exports = db