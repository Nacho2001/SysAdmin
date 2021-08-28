<template>
    <nav class="navbar navbar-dark bg">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 fw-bold fs-1">Teorema de Pitágoras</span>
        </div>
    </nav>
    <div class="row">
        <div class="col-5">
            <div>
                <label class="from-label fs-5">Cateto opuesto</label>
                <input v-model="cat1" type="number" class="form-control mt-1" placeholder="Ingrese cateto">
            </div>
            <div class="mt-3">
                <label class="from-label fs-5">Cateto adyacente</label>
                <input v-model="cat2" type="number" class="form-control mt-1" placeholder="Ingrese cateto">
            </div>
            <button @click="Calculo()" class="btn btn-warning btn-lg mt-3">Calcular Hipotenusa</button>
        </div>
        <div class="col-7">
            <div class="ms-2">
                <h3 class="text-white" >El valor de la Hipotenusa es:</h3>
                <h3 class="text-white" >{{hipo}}</h3>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PitagorasCalc',
        data(){
            return {            
                cat1:null,
                cat2:null,
                hipo:null
            }
        },
        methods:{
            Calculo(){
                // Calculo de la Hipotenusa:
                this.hipo = Math.sqrt(Math.pow(this.cat1,2) + Math.pow(this.cat2,2)).toFixed(2)
                // También se puede hacer con Math.pow(nro, 1 / 2) 
                // o en caso de raíz cúbica Math.pow(nro, 1 / 3)
            }
        }
    }
</script>