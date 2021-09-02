const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/cliente.route')

// aca obtengo toda la funcionalidad de express, depositada en la constante server
const server = express()

//especificamos el formato de datos que va a manipular nuestro servidor, es decir, nuestar API
server.use(express.json())

//cors os va a permitir comunicar al cliente on el servidor y viceversa
server.use(cors())

// nos va a notificar en consola, cada vez que se haga peticion HTTP(put,delete,post,get)
server.use(morgan('dev'))

//seteamos puerto disponible en el sistema (se guarda el puerto disponible en express o el 3000)
server.set('port', process.env.PORT || 3000)

//se fue a buscar lo que guardó port y le damos arranque el servidor
server.listen(server.get('port'))

//poner las rutas en funcionamiento
server.use(require('./routes/cliente.route'))

console.log(`Servidor corriendo en el puerto ${server.get('port')}`)

// si se hace algún cambio en el código, es importante reiniciar el servidor para aplicar los cambios