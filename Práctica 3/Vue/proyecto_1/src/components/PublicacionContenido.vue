<template>
    <div class="row">
        <div class="col-4">
            <div>
                <label class="form-label">Título</label>
                <input v-model="titulo" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label class="form-label">Nota</label>
                <textarea v-model="cuerpo" class="form-control" rows="5"></textarea>
            </div>
            <button @click="mostrar" class="btn btn-danger">Mostrar</button>
        </div>
        <div class="col-8">
            <ul>
                <li v-for="p in publicaciones" v-bind:key="p.id" class="list-group-item active">{{p.title}}</li>

            </ul>
        </div>

    </div>
 
</template>
<script>
export default {
    name: 'PublicacionContenido',
    data(){
        return{
            cuerpo:'',
            titulo:'',
            publicaciones:[]
        }
    },
    methods:{
        mostrar(){
            console.log(`
            NOTA DEL DIA
            ${this.titulo}
            
            Desarrollo:
            ${this.cuerpo}`),

            this.listarPublicaciones()

        },

        async listarPublicaciones(){
            const lista = await fetch("https://jsonplaceholder.typicode.com/posts")

            this.publicaciones = await lista.json()
        }
    }
}

</script>