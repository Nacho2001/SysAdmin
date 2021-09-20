<template>
    <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="nombre" class="form-control" type="text" placeholder="Ingrese el nombre">
    </div>
    <div class="mb-3">
        <label class="form-label">Apellido</label>
        <input v-model="apellido" class="form-control" type="text" placeholder="Ingrese apellido">
    </div>
    <div class="mb-3">
        <label class="form-label">DNI</label>
        <input v-model="dni" type="number" placeholder="Ingrese DNI">
    </div>
    <button class="btn btn-success">Aceptar</button>
</template>

<script>
export default {
    name:"/ClienteForm"
    data(){
        return{
            nombre:'',
            apellido:'',
            dni:null
        }
    },
    methods:{
        guardarCliente(){
            
        }
    }
}
</script>