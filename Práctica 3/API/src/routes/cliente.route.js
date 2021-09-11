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
enrutador.post('/cliente', (req,res) => {
    const unCliente = req.body;
    db.query('insert into cliente set ?',[unCliente], (err,result) => {

        if(err){
            return console.log('Ocurrió un error')
        }else{
            res.json('El cliente se insertó exitosamente')
        }
    })

})

//Implementacion y creacion ruta cliente
enrutador.put('/cliente/:codigo', async (req,res) => {

    //primer paso:capturar el código
    const id = req.params.codigo
    //segundo paso: capturar el body, los datos del cliente modificado
    const clienteModificado = req.body;

    await db.query('update cliente set ? where id_cliente = ?',[clienteModificado,id],(err,result) => {
        if(err){
            return console.log('Algo ocurrió!')
        }else{
            console.log('Operación exitosa!!')
            res.json('Operación exitosa!!')
        };
    })
})

//busco clientes por id
enrutador.get('/cliente/:codigo', async (req,res) => {

    const id = req.params.codigo;
    await db.query('select * from cliente where id_cliente = ?',[id], (err, rows) => {
        if(err){
            return console.log('Algo ocurrio')
        }else{
            res.json(rows[0])
        }

    })

})

module.exports = enrutador