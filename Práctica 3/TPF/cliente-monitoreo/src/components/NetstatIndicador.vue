<template>
    <div>
        <h4>Datos de redes desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaNet()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option v-for="cliente of listado" v-bind:key="cliente.direccion_ip" v-bind:value="cliente.direccion_ip">{{cliente.razon_social}}</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <h5>Interfaz eth0:</h5>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4><i class="fa fa-arrow-down me-1"></i>Valor de entrada:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.eth0_input}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>eth0</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-danger">
                    <div class="card-header text-center bg-danger">
                        <h4><i class="fa fa-arrow-up me-1"></i>Valor de salida:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.eth0_output}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>eth0</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <h5>Interfaz lo:</h5>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4><i class="fa fa-arrow-down me-1"></i>Valor de entrada:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.lo_input}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>lo</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-danger">
                    <div class="card-header text-center bg-danger">
                        <h4><i class="fa fa-arrow-up me-1"></i>Valor de salida:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.lo_output}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>lo</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
    name: 'NetstatIndicador',
    data(){
        return {
            equipo:'',
            eth0_input:null,
            eth0_output:null,
            lo_input:null,
            lo_output:null,
            listado:[]
        }
    },
    methods:{
        capturaNet(){
            const socket = io(this.equipo)

            socket.on('netstat-eth0', (objeto) => {
                this.eth0_input = objeto.input;
                this.eth0_output = objeto.output;
            }),

            socket.on('netstat-lo', (objeto) => {
                this.lo_input = objeto.input;
                this.lo_output = objeto.output;
            })
        },
        listar_clientes(){
            this.axios.get("http://192.168.200.18:5000/clientes").then(result => {
                this.listado = result.data;
            })
        }
    },
    mounted(){
        this.capturaNet()
        this.listar_clientes()
    }
}
</script>