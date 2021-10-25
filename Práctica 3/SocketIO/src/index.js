const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const server = express()
const os = require('node-os-utils')
const cpu2 = require('cputemp')

// acceder a los recursos

const cpu = os.cpu

server.set('port', process.env.PORT || 3000)

server.use(cors())

const servidor = server.listen(server.get('port'), () => {
    console.log('Se logró la conexión correctamente')
});

//le pasamos el servidora socketio para habilitar el canal web a socket
const io = socketio(servidor)

//establecemos la apertura del canal, para despues emitir datos
io.on('connection', (socket) => {
    setInterval(() => {
        socket.emit('dato-socket',{dato:Math.random(),nombre:'Nacho'})
    }, 1000)

    setInterval(() => {
        cpu.free()
        .then((info) => {
            socket.emit('datos-cpu',
            {
                descripcion: 'CPU FREE',
                data: info
            })
        })
    },3000)

    setInterval(() => {
        cpu.usage()
        .then((info) => {
            socket.emit('uso-cpu',
            {
                descripcion: 'CPU USAGE',
                data: info
            })
        })
    },5000)


    /*si.cpuTemperature()
    .then((data) => {
        socket.emit('temperatura',
        {
            main:data.main,
            cores:data.cores,
            max:data.max
        })
    });*/

    socket.on('respuesta', (valor) => {
        console.log(valor)
    })
})