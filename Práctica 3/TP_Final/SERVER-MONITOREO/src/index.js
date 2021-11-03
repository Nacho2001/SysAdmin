//Invoco los servicios necesarios

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/clientes.route')

//Consigo las funciones de express en "server"
const server = express()

//Especifico el uso del formato JSON
server.use(express.json())

//Utilizo el cors para la comunicar al cliente y al servidor
server.use(cors())

//Para notificar en consola cuando realice una petición
server.use(morgan('dev4'))

//Puerto que voy a utilizar: 5000
server.set('port', process.env.PORT || 3000)

//Busca "port" e inicia el servidor
server.listen(server.get('port'))

//Busca y utiliza las rutas
server.use(require('./routes/clientes.route'))

//muestra el mensaje de inicio del servidor por consola
console.log(`Servidor puesto en marcha en el puerto ${server.get('port')}`)