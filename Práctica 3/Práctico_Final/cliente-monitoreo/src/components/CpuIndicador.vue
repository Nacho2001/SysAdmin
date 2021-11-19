<template>
    <div>
        <h4>Recibiendo datos de CPU desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaCpu()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:5020">Mi equipo</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Uso de CPU:</h4>
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
                        <h4>CPU Libre:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_free}}</h5>
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
                        <h4>Nro de cores:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_count}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>CPU Count</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Modelo CPU:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.valor_cpu_model}}</h5>
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
            valor_cpu_usage:null,
            valor_cpu_free:null,
            valor_cpu_count:null,
            valor_cpu_model:null,
        }
    },
    methods:{
        capturaCpu(){
            const socket = io(this.equipo)

            socket.on('cpu-usage', (objeto) => {
                this.valor_cpu_usage = objeto.data.toFixed(2);
            }),

            socket.on('cpu-free', (objeto) => {
                this.valor_cpu_free = objeto.data.toFixed(2);
            }),

            socket.on('cpu-count', (objeto) => {
                this.valor_cpu_count = objeto.data;
            }),

            socket.on('cpu-model', (objeto) => {
                this.valor_cpu_model = objeto.data;
            })
        }
    },
    mounted(){
        this.capturaCpu()
    }
}
</script>