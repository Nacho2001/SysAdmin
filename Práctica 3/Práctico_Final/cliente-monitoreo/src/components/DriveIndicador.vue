<template>
    <div>
        <h4>Datos de Drive desde Socket del equipo</h4>
        <h5>Informe del disco:</h5>
        <div class="row mt-3">
            <div class="col-3">
                <select @change="capturaDrive()" v-model="equipo" class="form-select">
                    <option value="-1">Seleccione equipo...</option>
                    <option value="http://localhost:5020">Mi equipo</option>
                </select>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
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
        <div class="row mt-5">
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
                        <h4>Porcentaje:</h4>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <h5>{{this.drive_porcentaje}}</h5>
                    </div>
                    <div class="card-footer text-center bg-dark">
                        <h4>Valor (%)</h4>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="card border-success">
                    <div class="card-header text-center bg-success">
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
import io from 'socket.io-client'
export default {
    name: 'DriveIndicador',
    data(){
        return {
            equipo:'',
            drive_utilizado:null,
            drive_libre:null,
            drive_porcentaje:null,
            drive_total:null
        }
    },
    methods:{
        capturaDrive(){
            const socket = io(this.equipo)

            socket.on('drive', (objeto) => {
                this.drive_utilizado = objeto.utilizado;
                this.drive_libre = objeto.libre;
                this.drive_porcentaje = objeto.l_porcentaje;
                this.drive_total = objeto.total;
            })
        }
    },
    mounted(){
        this.capturaDrive()
    }
}
</script>