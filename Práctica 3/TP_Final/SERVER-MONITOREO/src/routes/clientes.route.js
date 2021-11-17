const express = require('express')

//Funciones del router
const enrutador = express.Router()

//Llama a la db
const db = require('../database')

//Operaciones en la BD:

//Listar todos los clientes
enrutador.get('/clientes', (req,res) => {
    db.query('select * from cliente', (err,rows) => { //Realiza la consulta a la DB
        if(err){
            console.log('Hubo un error al listar los clientes')  // Muestra por consola si hubo un error 
        }else{
            console.log("Consulta de clientes exitosa!") // O si realizó la consulta con exito
            res.json(rows) //Lista a los clientes en JSON
        }
    })
});

//Borrar clientes
enrutador.delete('/cliente/:codigo', async (req,res) => {
    const id = req.params.codigo;
    await db.query('delete from cliente where id_cliente = ?', [id], (err,result) => {
        if(err){
            return console.log('Error al eliminar al cliente')
        }else{
            res.json('Cliente borrado con éxito!')
        }
    })
});

//Agregar clientes
enrutador.post('/cliente', (req,res) => {
    const persona = req.body;
    db.query('insert into cliente set ?',[persona], (err,result) => {

        if(err){
            return console.log('Ocurrió un error')
        }else{
            res.json('El cliente se insertó exitosamente')
        }
    })

});


//Actualizar un cliente
enrutador.put('/cliente/:codigo', async (req,res) => {

    const id = req.params.codigo
    const actualizado = req.body;

    await db.query('update cliente set ? where id_cliente = ?',[actualizado,id],(err,result) => {
        if(err){
            return console.log('Algo ocurrió!')
        }else{
            console.log('Cliente actualizado!!')
            res.json('Cliente actualizado!!')
        };
    })
});

//Busqueda de cliente por ID
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