<template>
    <div>
        <h3>Recibiendo datos</h3>
        <div class="row mb-3">
            <div class="col-3">
                <select @change="capturar_random()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:3000">Mi equipo</option>
                    <option value="http://172.16.8.184:3000">Equipo de Dario</option>
                    <option value="http://172.16.8.254:3000">Equipo de Romina</option>
                    <option value="http://172.16.9.28:3000">Equipo de Andrea</option>
                    <option value="http://lautaro00.ddns.net:3000">Equipo de Lautaro R</option>
                    <option value="http://172.16.8.175:3000">Equipo de Belén</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header text-center"><b>{{nombre}}</b></div>
                        <div class="card-body text-center">
                            <h1>{{valor_recibido}}</h1>    
                        </div>
                        <div class="card-footer">
                            <h4>{{estado}}</h4>
                        </div>                
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header text-center">
                        {{this.descripcion_cpu_free}}
                    </div>
                    <div class="card-body text-center">
                        <h1>{{this.valor_cpu_free}}</h1>
                    </div>
                    <div class="card-footer">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header text-center">
                        {{this.descripcion_cpu_usage}}
                    </div>
                    <div class="card-body text-center">
                        <h1>{{this.valor_cpu_usage}}</h1>
                    </div>
                    <div class="card-footer">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <table class="table mt-3">
                <thead>
                    <th>Main</th>
                    <th>Cores</th>
                    <th>Max</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{{this.temp}}</td>
                        <td>{{this.cores}}</td>
                        <td>{{this.max}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
    name:'SocketIndicador',
    data() {
        return {
            valor_recibido:null,
            estado:'',
            equipo:'',
            nombre:'',
            valor_cpu_free:null,
            descripcion_cpu_free:'',
            valor_cpu_usage:null,
            descripcion_cpu_usage:'',
        }
    },
    methods:{
        capturar_random(){
            //tenemos que conectarnos y/o vincular nuestro cliente con el servidor
            const socket  = io(this.equipo)

            socket.on('dato-socket', (objeto) => {
                this.valor_recibido = objeto.dato.toFixed(2);
                this.nombre = objeto.nombre;
                if(this.valor_recibido > 0.7){
                    this.estado = "Elevado"
                }else{
                    this.estado = "Normal"
                }
            }),
            //datos cpu
            socket.on('datos-cpu', (objeto) => {
                this.valor_cpu_free = objeto.data.toFixed(2);
                this.descripcion_cpu_free = objeto.descripcion;
            }),
            //uso del cpu
            socket.on('uso-cpu', (objeto) => {
                this.valor_cpu_usage = objeto.data.toFixed(3);
                this.descripcion_cpu_usage = objeto.descripcion;
            }),
            //temperatura
            socket.on('temperatura', (objeto) => {
                this.temp = objeto.main,
                this.cores = objeto.cores,
                this.max = objeto.max
            })
        }


    },
    mounted(){
        this.capturar_random()
    }
}
</script>