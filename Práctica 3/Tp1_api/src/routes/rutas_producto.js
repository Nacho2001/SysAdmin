const express = require('express')

const enrutador = express.Router()

const db = require('../database')

//Muestro todos los datos de un producto
enrutador.get('/productos', async (req,res) => {
    await db.query('select * from producto', (err,rows) => {
        if(err){
            console.log('Hubo un error al realizar la consulta')
        }else{
            res.json(rows)
        }
    })
});

//Operación agregar producto
enrutador.post('/producto', async (req,res) => {
    const elemento = req.body;
    await db.query('insert into producto set ?', [elemento], (err,result) => {
        if(err){
            return console.log('Paso algo al agregar el producto...')
        }else{
            res.json('Salió todo bien, el producto se agregó')
        }
    })
});

//Operación borrar producto
enrutador.delete('/producto/:codigo', async (req,res) => {
    const id = req.params.codigo;
    await db.query('delete from producto where id_producto = ?', [id], (err,result) => {
        if(err){
            return console.log('Hay un error en la operación')
        }else{
            res.json('Producto eliminado!')
        }
    })
});

//Actualización de producto
enrutador.put('/producto/:codigo', async (req,res) => {
    const id = req.params.codigo;
    const nproducto = req.body;

    await db.query('update producto set ? where id_producto = ?', [nproducto,id],(err,result) => {
        if(err){
            return console.log('Algo salió mal')
        }else{
            console.log('La operación fue exitosa')
            res.json('La operación fue exitosa')
        };
    })
});

//busqueda de producto por id

enrutador.get('/producto/:codigo', async (req,res) => {
    const id = req.params.codigo;
    await db.query('select * from producto where id_producto = ?',[id], (err,rows) => {
        if(err){
            return console.log('Pasó algo en la busqueda...')
        }else{
            res.json(rows[0])
        }
    })
})

//exporto el enrutador
module.exports = enrutador