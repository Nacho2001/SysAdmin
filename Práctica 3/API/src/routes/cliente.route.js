const express = require('express')

const enrutador = express.Router()

const db = require('../database')

enrutador.get('/clientes', (req,res) => {

    //vamos a realizar una consulta a la base, es decir una query
    db.query('select * from cliente', (err,rows) => {
        if(err){
            console.log('Algo sucedió al realizar la consulta')
        }else{
        //entregamos como respuesta los datos de clientes en formato json
        res.json(rows)
        }
    })

})

module.exports = enrutador