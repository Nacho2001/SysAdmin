<template>
    <div>
        <h4>Datos de Memoria desde Socket del equipo:</h4>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaMem()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:5020">Mi equipo</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Memoria Libre (MB):</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.memory_free}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Memoria Total (MB):</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.memory_total}}</h5>
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
                        <h4>Memoria Utilizada:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.memory_usage}}</h5>
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
    name: 'MemoriaIndicador',
    data(){
        return {
            equipo:'',
            memory_free:null,
            memory_total:null,
            memory_usage:null,
        }
    },
    methods:{
        capturaMem(){
            const socket = io(this.equipo)

            socket.on('mem-free', (objeto) => {
                this.memory_total = objeto.total.toFixed(2);
                this.memory_free = objeto.libre.toFixed(2);
            }),

            socket.on('mem-usage', (objeto) => {
                this.memory_usage = objeto.utilizada.toFixed(2)
            })
        }
    },
    mounted(){
        this.capturaMem()
    }
}
</script>