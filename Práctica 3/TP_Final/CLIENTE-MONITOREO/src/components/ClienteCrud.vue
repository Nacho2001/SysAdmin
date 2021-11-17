<template>
<div> 
    <div class="row"> 
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label">Razón social</label>
                <input v-model="razon_social" class="form-control" type="text" placeholder="Ingrese razón social">
            </div>
            <div class="mb-3">
                <label class="form-label">Teléfono de contacto</label>
                <input v-model="telefono_contacto" class="form-control" type="number" placeholder="Ingrese número de contacto">
            </div>
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input v-model="correo_electronico" class="form-control" type="email" placeholder="Ingrese su correo electrónico">
            </div>
        </div>
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label">Dirección</label>
                <input v-model="direccion" class="form-control" type="text" placeholder="Ingrese dirección">
            </div>
            <div class="mb-3">
                <label class="form-label">Localidad</label>
                <input v-model="localidad" class="form-control" type="text" placeholder="Ingrese lugar de residencia">
            </div>
            <div class="mb-3">
                <label class="form-label">Descripción del equipo</label>
                <input v-model="equipo_descripcion" class="form-control" type="text" placeholder="Escriba breve descripción del equipo">
            </div>
        </div>
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label">Dirección IP</label>
                <input v-model="direccion_ip" class="form-control" type="text" placeholder="http://direccion_ip:puerto">
            </div>
            <div class="mb-3">
                <label class="form-label">Sistema operativo</label>
                <input v-model="sistema_operativo" class="form-control" type="text" placeholder="Nombre el sistema operativo">
            </div>

            <div v-if="state == 0">
                <button @click="guardar()" class="btn btn-success mt-4">Guardar cliente</button>
            </div>
            <div v-if="state == 1">
                <button @click="actualizar()" class="btn btn-warning mt-4">Actualizar cliente</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th class="text-center">Razón social</th>
                        <th class="text-center">Teléfono</th>
                        <th class="text-center">Correo electrónico</th>
                        <th class="text-center">Dirección</th>
                        <th class="text-center">Localidad</th>
                        <th class="text-center">Descripción</th>
                        <th class="text-center">Dirección IP</th>
                        <th class="text-center">Sistema Operativo</th>
                        <th class="text-center">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente of listado" v-bind:key="cliente.id_cliente">
                        <td class="text-center">{{cliente.razon_social}}</td>
                        <td class="text-center">{{cliente.telefono_contacto}}</td>
                        <td class="text-center">{{cliente.correo_electronico}}</td>
                        <td class="text-center">{{cliente.direccion}}</td>
                        <td class="text-center">{{cliente.localidad}}</td>
                        <td class="text-center">{{cliente.equipo_descripcion}}</td>
                        <td class="text-center">{{cliente.direccion_ip}}</td>
                        <td class="text-center">{{cliente.sistema_operativo}}</td>
                        <td>
                            <button @click="editar(cliente)" class="btn btn-outline-primary btn-sm">Editar</button>
                            <button @click="eliminar(cliente.id_cliente)" class="btn btn-danger fw-bold btn-sm ms-2">x</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:"ClienteCrud",
    data(){
        return{
            razon_social:'',
            telefono_contacto:null,
            correo_electronico:'',
            direccion:'',
            localidad:'',
            equipo_descripcion:'',
            direccion_ip:'',
            sistema_operativo:'',
            listado:[],
            state:0
        }
    },
    methods:{
        limpiar(){
            this.razon_social = "",
            this.telefono_contacto = null,
            this.correo_electronico = "",
            this.direccion = "",
            this.localidad = "",
            this.equipo_descripcion = "",
            this.direccion_ip = "",
            this.sistema_operativo = ""
        },

        guardar(){
            const elemento = {
                razon_social:this.razon_social,
                telefono_contacto:this.telefono_contacto,
                correo_electronico:this.correo_electronico,
                direccion:this.direccion,
                localidad:this.localidad,
                equipo_descripcion:this.equipo_descripcion,
                direccion_ip:this.direccion_ip,
                sistema_operativo:this.sistema_operativo
            }

            this.axios.post("http://localhost:5000/cliente", elemento).then(result => {
                alert(result.data)
                this.limpiar()
                this.listar()
            })
        },

        listar(){
            this.axios.get("http://localhost:5000/clientes").then(result => {
                this.listado = result.data;
            })
        },

        eliminar(id){
            this.axios.delete("http://localhost:5000/cliente/"+ id).then(result => {
                alert(result.data)
                this.listar()
            })
        },

        editar(elemento){
            this.state = 1;
            this.razon_social = elemento.razon_social;
            this.telefono_contacto = elemento.telefono_contacto;
            this.correo_electronico = elemento.correo_electronico;
            this.direccion = elemento.direccion;
            this.localidad = elemento.localidad;
            this.equipo_descripcion = elemento.equipo_descripcion;
            this.direccion_ip = elemento.direccion_ip;
            this.sistema_operativo = elemento.sistema_operativo;
            this.id = elemento.id_cliente;
        },

        actualizar(){
            const ClienteCambiado = {
                razon_social:this.razon_social,
                telefono_contacto:this.telefono_contacto,
                correo_electronico:this.correo_electronico,
                direccion:this.direccion,
                localidad:this.localidad,
                equipo_descripcion:this.equipo_descripcion,
                direccion_ip:this.direccion_ip,
                sistema_operativo:this.sistema_operativo
            }
            this.axios.put("http://localhost:5000/cliente/"+ this.id,ClienteCambiado).then(result => {
                alert(result.data)
                this.listar()
                this.limpiar()
                this.state = 0;
            })
        }
    },
    mounted(){
        this.listar()
    }
}
</script>