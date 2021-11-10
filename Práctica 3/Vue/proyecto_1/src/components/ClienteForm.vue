<template>
    <div class="row">
        <div class="col-4">
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
                <input v-model="dni" class="form-control" type="number" placeholder="Ingrese DNI">
            </div>


            <div v-if="estado == 0">
                <button @click="guardarCliente()" class="btn btn-success">Guardar cliente</button>
            </div>
            <div v-if="estado == 1">
                <button @click="actualizarCliente()" class="btn btn-primary">Actualizar cliente</button>
            </div>

        </div>
        <div class="col-8">
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente of lista" v-bind:key="cliente.id_cliente">
                        <td>{{cliente.nombre}}</td>
                        <td>{{cliente.apellido}}</td>
                        <td>{{cliente.dni}}</td>
                        <td>
                            <button @click="eliminarCliente(cliente.id_cliente)" class="btn btn-danger btn-sm">x</button>
                            <button @click="editarCliente(cliente)" class="btn btn-primary btn-sm mr-1">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'ClienteForm',
    data(){
        return{
            nombre:'',
            apellido:'',
            dni:null,
            lista:[],
            estado:0
        }
    },
    methods:{
        vaciar(){
            this.nombre = "",
            this.apellido = "",
            this.dni = null
        },

        guardarCliente(){
            const unCliente = {
                nombre:this.nombre,
                apellido:this.apellido,
                dni:this.dni
            }

            this.axios.post("http://localhost:3000/cliente", unCliente).then(result => {
                
                alert(result.data)
                this.vaciar()
                this.listarClientes()
            })
        },

        listarClientes(){
            this.axios.get("http://localhost:3000/clientes").then(result => {
                this.lista = result.data;
            })
        },

        eliminarCliente(id){
            this.axios.delete("http://localhost:3000/cliente/"+ id).then(result => {
                alert(result.data)
                this.listarClientes()
            })
        },

        editarCliente(unCliente){
            this.estado = 1;
            this.nombre = unCliente.nombre;
            this.apellido = unCliente.apellido;
            this.dni = unCliente.dni;
            this.id = unCliente.id_cliente;
        },

        actualizarCliente(){
            const clienteModificado = {
                nombre:this.nombre,
                apellido:this.apellido,
                dni:this.dni
            }
            this.axios.put("http://localhost:3000/cliente/"+ this.id,clienteModificado).then(result => {
                alert(result.data)
                this.listarClientes()
                this.vaciar()
                this.estado = 0;
            })
        }
    },
    mounted(){
        this.listarClientes()
    }
}
</script>