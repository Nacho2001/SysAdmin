<template>

    <div class="mb-3">
        <label class="form-label">Método de calculo</label>
        <select @change="modificarlabels()" v-model="select" class="form-select">
            <option value="-1" disabled selected>Seleccione un método</option>
            <option value="0">Intensidad</option>
            <option value="1">Tensión</option>
            <option value="2">Potencia</option>
        </select>
    </div>
    <div class="mb-3">
        <label class="form-label">{{lbl}}</label>
        <input v-model="dato1" class="form-control" type="number">
    </div>
    <div class="mb-3">
        <label class="form-label">{{lbl2}}</label>
        <input v-model="dato2" class="form-control" type="number">
    </div>

    <button @click="calcular()" class="btn btn-warning">Calcular</button>

    <div class="mt-3">
        <h3>{{resultado}}</h3>
    </div>

</template>
<script>
    export default {
        name:'OhmCalculo',

        data(){
            return {
            dato1:null,
            dato2:null,
            select:-1,
            lbl:'  ',
            lbl2:'  ',
            resultado:null
            }

        },
        methods:{
            validacion(to) {
                if (this.select == 0){
                    to == 0 ? (this.lbl = "Tensión", this.lbl2 = "Resistencia") : (this.resultado = this.dato1 / this.dato2)
                }else{
                    if(this.select == 1){
                        to == 0 ? (this.lbl = "Intensidad", this.lbl2 = "Resistencia") : (this.resultado = this.dato1 * this.dato2)
                    }else{
                        to == 0 ? (this.lbl = "Resistencia", this.lbl2 = "Intensidad") : (this.resultado = this.dato1 * Math.pow(this.dato2,2) )
                        }
                    }
                },
            modificarlabels(){
                this.validacion(0)
            },
            calcular(){
                this.validacion(1)
            },
        }
    }
</script>