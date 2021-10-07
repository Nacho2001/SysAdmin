<template>
    <div class="row">
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label">Descripción del producto</label>
                <input v-model="descripcion" class="form-control" type="text" placeholder="Ingrese la descripción del producto">
            </div>
            <div>
                <label class="form-label">Precio de compra</label>
                <input v-model="precio_compra" class="form-control" type="text" placeholder="Ingrese el monto de compra">
            </div>
            <div>
                <label class="form-label">Precio de venta</label>
                <input v-model="precio_venta" class="form-control" type="text" placeholder="Ingrese el monto de venta">
            </div>
            <div>
                <label class="form-label">Stock</label>
                <input v-model="stock" class="form-control" type="number" placeholder="Ingrese las unidades disponibles">
            </div>

            <div class="mt-3" v-if="estado == 1">
                <button @click="guardar_producto()" class="btn btn-success">Guardar producto</button>
            </div>
            <div class="mt-3" v-if="estado == 2">
                <button @click="actualizar_producto()" class="btn btn-warning">Actualizar producto</button>
            </div>
        </div>
        <div class="col-8">
            <table class="table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Precio de compra</th>
                        <th>Precio de venta</th>
                        <th>Stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto of catalogo" v-bind:key="producto.id_producto">
                        <td>{{producto.descripcion}}</td>
                        <td>{{producto.precio_compra}}</td>
                        <td>{{producto.precio_venta}}</td>
                        <td>{{producto.stock}}</td>
                        <td>
                            <button @click="borrar_producto(producto.id_producto)" class="btn btn-danger btn-sm me-2">x</button>
                            <button @click="modificar_producto(producto)" class="btn btn-warning btn-sm">Editar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProductoComp',
    data(){
        return{
            descripcion:'',
            precio_compra:'',
            precio_venta:'',
            stock:null,
            catalogo:[],
            estado:1
        }   
    },
    methods:{

        limpiar(){
            this.descripcion = '',
            this.precio_compra = '',
            this.precio_venta = '',
            this.stock = null
        },

        ver_productos(){
            this.axios.get("http://localhost:2500/productos").then(result => {
                this.catalogo = result.data;
            })
        },

        guardar_producto(){
            const articulo = {
                descripcion:this.descripcion,
                precio_compra:this.precio_compra,
                precio_venta:this.precio_venta,
                stock:this.stock
            }

            this.axios.post("http://localhost:2500/producto", articulo).then(result => {
                alert(result.data)
                this.limpiar()
                this.ver_productos()
            })
        },

        borrar_producto(id){
            this.axios.delete("http://localhost:2500/producto/" + id).then(result => {
                alert(result.data)
                this.ver_productos()
            })
        },
        modificar_producto(articulo){
            this.estado = 2;
            this.descripcion = articulo.descripcion;
            this.precio_compra = articulo.precio_compra;
            this.precio_venta = articulo.precio_venta;
            this.stock = articulo.stock;
            this.id = articulo.id_producto;
        },

        actualizar_producto(){
            const productoCambiado = {
                descripcion:this.descripcion,
                precio_compra:this.precio_compra,
                precio_venta:this.precio_venta,
                stock:this.stock,
            }
            
            this.axios.put("http://localhost:2500/producto/" + this.id,productoCambiado).then(result => {
                alert(result.data)
                this.ver_productos()
                this.limpiar()
                this.estado = 1;
            })
        }
    },
    mounted(){
        this.ver_productos()
    }
}
</script>