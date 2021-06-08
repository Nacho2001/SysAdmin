
const mispropiedades = {

    data(){
        return {
            nombre:'',
            apellido:'',
            dni:null,
            lista_empleados:[]
        }

    },

    methods:{
        mostrar(){
            console.log(this.nombre)
        },
        guardarEmpleado(){

            let unEmpleado = {
                nombre:this.nombre,
                apellido:this.apellido,
                dni:this.dni
            }

            this.lista_empleados.push(unEmpleado)

            this.nombre = ''; this.apellido= ''; this.dni = ''

        },
        eliminarEmpleado(index)
        {
            this.lista_empleados.splice(index,1)

        }


    },

    mounted: {


    }

}

Vue.createApp(mispropiedades).mount("#app")