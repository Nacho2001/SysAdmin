<template>
        <div>
        <h4>Datos del SO desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaOS()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:5020">Mi equipo</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
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
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
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
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
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
            osa_arch:''
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

        }
    },
    mounted(){
        this.capturaOS()
    }
}
</script>