const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/rutas_cliente.js')

const server = express()
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

//voy a utilizar el puerto 2500
server.set('port', process.env.PORT || 2500)
server.listen(server.get('port'))
server.use(require('./routes/rutas_cliente.js'))

console.log(`El servidor corre en el puerto ${server.get('port')}`)