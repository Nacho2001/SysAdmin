//Invoco los servicios necesarios

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/clientes.route')
const socketio = require('socket.io')
const os = require('node-os-utils')
const cpu = os.cpu
const mem = os.mem
const netstat = os.netstat

//Consigo las funciones de express en "server"
const server = express()

//Especifico el uso del formato JSON
server.use(express.json())

//Utilizo el cors para la comunicar al cliente y al servidor
server.use(cors())

//Para notificar en consola cuando realice una petición
server.use(morgan('dev4'))

//Puerto que voy a utilizar: 5000
server.set('port', process.env.PORT || 5000)

//Busca "port" e inicia el servidor
server.listen(server.get('port'))

//Busca y utiliza las rutas
server.use(enrutador)

//muestra el mensaje de inicio del servidor por consola
console.log(`Servidor puesto en marcha en el puerto ${server.get('port')}`)

//El socket utilizará un puerto diferente al de la api: 5020
const servidor2 = server.listen(server.get(5020), () => {
   console.log('Servicio socket iniciado con éxito en el puerto 5020')
});

const io = socketio(servidor2)

io.on('connection', (socket) => { // Datos del CPU, los que no tienen setInterval no hace falta emitirlos segundo a segundo ya que son constantes
    setInterval(() => {
        cpu.usage()
        .then((info) => {
            socket.emit('cpu-usage',
            {
                nombre: 'CPU USAGE',
                data: info
            })
        })
    },1000)

    setInterval(() => {
        cpu.free()
        .then((info) => {
            socket.emit('cpu-free',
            {
                nombre: 'CPU FREE',
                data: info
            })
        })
    },1000)

    cpu.count()
    .then((info) => {
        socket.emit('cpu-count',
        {
            nombre: 'CPU COUNT',
            data: info
        })
    })

    cpu.model()
    .then((info) => {
        socket.emit('cpu-model',
        {
            nombre: 'CPU MODEL',
            data: info
        })
    })

    //Datos de DRIVE
    setInterval(() => {
        drive.info()
        .then((info) => {
            socket.emit('drive',
            {
                utilizado: info.usedGb,
                libre: info.freeGb,
                porcentaje: info.freePercentage,
                total: info.totalGb
            })
        })
    },1000)

    //Datos de MEMORY
    setInterval(() => {
        mem.free()
        .then((info) => {
            socket.emit('mem-free',
            {
                total: info.totalMemMb,
                libre: info.freeMemMb
            })
        })
    },1000)

    setInterval(() => {
        mem.usage()
        .then((info) => {
            socket.emit('mem-usage',
            {
                utilizada: info.usageMemMb
            })
        })
    },1000)

    //NETSTAT
    setInterval(() => {
        netstat.inOut()
        .then((info) => {
            socket.emit('netstat-eth0',
            {
                interface: info.interface.eth0,
                input: info.inputMb.eth0,
                output: info.outputMb.eth0
            })
        })
    },1000)

    setInterval(() => {
        netstat.stats()
        .then((info) => {
            socket.emit('netstat-lo',
            {
                interface: info.interface.lo,
                input: info.inputMb.lo,
                output: info.outputMb.lo
            })
        })
    },1000)

    //Datos de OS
    os.oos()
    .then((info) => {
        socket.emit('os-oos',
        {
            nombre: 'OS OOS',
            data: info
        })
    })

    os.hostname()
    .then((info) => {
        socket.emit('os-hostname',
        {
            nombre: 'OS HOSTNAME',
            data: info
        })
    })

    setInterval(() => {
        os.arch()
        .then((info) => {
            socket.emit('os-arch',
            {
                nombre: 'OS ARCH',
                data: info
            })
        })
    },1000)
})