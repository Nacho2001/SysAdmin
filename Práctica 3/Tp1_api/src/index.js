//cargo el express, cors, morgan y el archivo de las rutas y los utiliza 
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/rutas_producto')

const server = express()
server.use(express.json())
server.use(cors())
server.use(morgan('dev2'))

//voy a utilizar el puerto 2500
server.set('port', process.env.PORT || 2500)
server.listen(server.get('port'))
server.use(require('./routes/rutas_producto'))

//Notifica que el puerto corre en tal puerto
console.log(`El servidor corre en el puerto ${server.get('port')}`)