const express = require('express')

// se importan todas las funciones de router
const enrutador = express.Router()

const db = require('../database')

// recibe una solicitud y entrega respuestas
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

}),
//Operación para borrar clientes
enrutador.delete('/cliente/:codigo', async (req,res) => {
    const id = req.params.codigo;
    await db.query('delete from cliente where id_cliente = ?',[id], (err,result) => {
        if (err){
            return console.log('Algo ocurrió!')
        }else{
            res.json('Operación exitosa!!')
        }

    })

})
//Operación para agregar clientes
enrutador.post('/cliente', () => {
    const unCliente = req.body;
    db.query('inset into cliente set ?',[unCliente], (err,result) => {

        if (err){
            return console.log('Ocurrió un error')
        }else{
            res.json('El cliente se insertó exitosamente')
        }
    })

})

module.exports = enrutador