<template>
    <div>
        <h4>Datos de Drive desde Socket del equipo</h4>
        <h5>Informe del disco:</h5>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaDrive()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option v-for="cliente of listado" v-bind:key="cliente.direccion_ip" v-bind:value="cliente.direccion_ip">{{cliente.razon_social}}</option>
                </select>
            </div>
        </div>
        <div>
            <div class="progress mt-4 mb-3">
                <div class="progress-bar progress-bar-striped" role="progressbar" v-bind:style="styleArray" v-bind:aria-valuenow="this.drive_porcentaje" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-danger">
                    <div class="card-header text-center bg-danger">
                        <h4>Utilizado:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.drive_utilizado}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>GB</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Libre:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.drive_libre}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>GB</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5 mb-5">
            <div class="col-5">
                <div class="card border-danger">
                    <div class="card-header text-center bg-danger">
                        <h4>Capacidad:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.drive_porcentaje}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Utilizado (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-primary">
                    <div class="card-header text-center bg-primary">
                        <h4>Total:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.drive_total}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>GB</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const styleArray=("width: "+ this.drive_porcentaje+ "%")
import io from 'socket.io-client'
export default {
    name: 'DriveIndicador',
    data(){
        return {
            equipo:'',
            drive_utilizado:null,
            drive_libre:null,
            drive_porcentaje:null,
            drive_total:null,
            listado:[]
        }
    },
    methods:{
        capturaDrive(){
            const socket = io(this.equipo)
            socket.on('drive', (objeto) => {
                this.drive_utilizado = objeto.utilizado.toFixed(2);
                this.drive_libre = objeto.libre.toFixed(2);
                this.drive_porcentaje = objeto.porcentaje;
                this.drive_total = objeto.total.toFixed(2);
            })
        },
        listar_clientes(){
            this.axios.get("http://192.168.200.18:5000/clientes").then(result => {
                this.listado = result.data;
            })
        }
    },
    mounted(){
        this.capturaDrive()
        this.listar_clientes()
    }
}
</script>