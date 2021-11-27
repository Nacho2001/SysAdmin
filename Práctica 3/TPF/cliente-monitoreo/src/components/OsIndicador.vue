<template>
    <div>
        <h4>Datos del SO desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaOS()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option v-for="cliente of listado" v-bind:key="cliente.direccion_ip" v-bind:value="cliente.direccion_ip">{{cliente.razon_social}}</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Sistema Operativo utilizado:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.os_oos}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>{{this.os_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Hostname (nombre del equipo):</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.osh_hostname}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>{{this.osh_name}}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Arcquitectura:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.osa_arch}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>{{this.osa_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="col-7">
                <i class="fa fa-android" style="font-size:140px;color:green"></i>
                <i class="fa fa-linux me-3" style="font-size:140px;color:black"></i>
                <i class="fa fa-windows me-3" style="font-size:140px;color:blue"></i>
                <i class="fa fa-apple me-3" style="font-size:140px;color:white"></i>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
    name: 'OsIndicador',
    data(){
        return {
            equipo:'',
            os_name:'',
            os_oos:'',
            osh_name:'',
            osh_hostname:'',
            osa_name:'',
            osa_arch:'',
            listado:[]
        }
    },
    methods:{
        capturaOS(){
            const socket = io(this.equipo)

            socket.on('os-oos', (objeto) => {
                this.os_name = objeto.name;
                this.os_oos = objeto.data;
            }),

            socket.on('os-hostname', (objeto) => {
                this.osh_name = objeto.name;
                this.osh_hostname = objeto.data;
            }),

            socket.on('os-arch', (objeto) => {
                this.osa_name = objeto.name;
                this.osa_arch = objeto.data;
            })

        },
        listar_clientes(){
            this.axios.get("http://192.168.200.18:5000/clientes").then(result => {
                this.listado = result.data;
            })
        }
    },
    mounted(){
        this.capturaOS()
        this.listar_clientes()
    }
}
</script>