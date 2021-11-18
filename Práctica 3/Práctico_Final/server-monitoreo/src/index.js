//Invoco los servicios necesarios

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const enrutador = require('./routes/clientes.route')
const socketio = require('socket.io')
const os = require('node-os-utils')
const cpu = os.cpu
const mem = os.mem
const drive = os.drive
const netstat = os.netstat
const oss = os.os
const nodeDiskInfo = require('./dist/index')

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
server.set('port2', process.env.PORT || 5020)

const servidor2 = server.listen(server.get('port2'), () => {
   console.log('Servicio socket iniciado con éxito en el puerto 5020')
});

const io = socketio(servidor2)

io.on('connection', (socket) => { // Datos del CPU, los que no tienen setInterval no hace falta emitirlos segundo a segundo ya que son constantes
    setInterval(() => {
        cpu.usage()
        .then((info) => {
            socket.emit('cpu-usage',
            {
                data: info
            })
        })
    },1000)

    setInterval(() => {
        cpu.free()
        .then((info) => {
            socket.emit('cpu-free',
            {
                data: info
            })
        })
    },1000)

    const cpu_count = cpu.count()

    socket.emit('cpu-count',
    {
        data: cpu_count
    })

    const cpu_model = cpu.model()
   
    socket.emit('cpu-model',
    {
        data: cpu_model
    })
    

    //Datos de DRIVE (solo en linux)
    /*setInterval(() => {
        drive.info()
        .then((info) => {
            socket.emit('drive',
            {
                utilizado: info.usedGb,
                libre: info.freeGb,
                l_porcentaje: info.freePercentage,
                total: info.totalGb
            })
        })
    },1000)*/

    //Datos DRIVE (con Windows)
    const disk = nodeDiskInfo.getDiskInfoSync() //Consigo los datos desde node-disk
    socket.emit('node-disk',
    {
        utilizado: disk.used,
        libre: disk.available,
        uso_porcentaje: disk.capacity,
        montado: disk.filesystem
    })

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
        mem.used()
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
                input: info.eth0.inputMb,
                output: info.eth0.outputMb
            })
        })
    },1000)

    setInterval(() => {
        netstat.stats()
        .then((info) => {
            socket.emit('netstat-lo',
            {
                input: info.lo.inputMb,
                output: info.lo.outputMb
            })
        })
    },1000)

    //Datos de OS
    const oos = oss.oos()
   
    socket.emit('os-oos',
    {
        data: oos,
        name:'OS OOS'
    })

    const hostname = oss.hostname()
    socket.emit('os-hostname',
    {
        data: hostname,
        name:'OS HOSTNAME'
    })

    const os_arch = oss.arch()
    socket.emit('os-arch',
    {
        data: os_arch,
        name: 'OS ARCH'
    })
})