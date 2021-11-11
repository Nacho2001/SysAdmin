<template>
    <div>
        <h4>Recibiendo datos de CPU desde Socket:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaCpu()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:5020">Mi equipo</option>
                    <option value="{{cliente.direccion_ip}}">{{cliente.direccion_ip}}</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>{{this.nombre_cpu_usage}}</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_usage}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>{{this.nombre_cpu_free}}</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.nombre_cpu_free}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>{{this.nombre_cpu_count}}</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_count}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>{{this.nombre_cpu_model}}</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_model}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
    name: 'CpuIndicador',
    data(){
        return {
            equipo:'',
            nombre_cpu_usage:'',
            valor_cpu_usage:null,
            nombre_cpu_free:'',
            valor_cpu_free:null,
            nombre_cpu_count:'',
            valor_cpu_count:null,
            nombre_cpu_model:'',
            valor_cpu_model:null,
        }
    },
    methods:{
        capturaCpu(){
            const socket = io(this.equipo)

            socket.on('cpu-usage', (objeto) => {
                this.valor_cpu_usage = objeto.data.toFixed(2);
                this.nombre_cpu_usage = objeto.nombre;
            }),

            socket.on('cpu-free', (objeto) => {
                this.valor_cpu_free = objeto.data.toFixed(2);
                this.nombre_cpu_free = objeto.nombre;
            }),

            socket.on('cpu-count', (objeto) => {
                this.valor_cpu_count = objeto.data.toFixed(2);
                this.nombre_cpu_count = objeto.nombre;
            }),

            socket.on('cpu-model', (objeto) => {
                this.valor_cpu_model = objeto.data.toFixed(2);
                this.nombre_cpu_model = objeto.nombre;
            })
        }
    },
    mounted(){
        this.capturaCpu()
    }
}
</script>