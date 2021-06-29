const mispagos = {

    data(){
        return {
            nombre:'',
            apellido:'',
            dni:'',
            correo:'',
            cuota:'',
            importe:'',
            fecha:'',
            tabla_pagos:[]
        }
    },

    methods: {
        guardar_pago(){
            const nuevoPago = {
                nombre:this.nombre,
                apellido:this.apellido,
                dni:this.dni,
                correo:this.correo,
                cuota:this.cuota,
                importe:this.importe,
                fecha:this.fecha
            }

            if("pagos" in localStorage){
                this.tabla_pagos = JSON.parse(localStorage.getItem("pagos")); //chequeo de lista
                this.tabla_pagos.push(nuevoPago); // carga el dato desde nuevoPago
                localStorage.setItem("pagos",JSON.stringify(this.tabla_pagos)); // carga el elemento al arreglo
            }else{
                this.tabla_pagos.push(nuevoPago); // carga el elemento desde nuevopago
                localStorage.setItem("pagos",JSON.stringify(this.tabla_pagos)) // crea el elemento en el arreglo
            }


        },

        listarPagos(){
            if("pagos" in localStorage){
                this.tabla_pagos = JSON.parse(localStorage.getItem("pagos")); //obtener elementos y listarlos
            }
            else{
                this.tabla_pagos = [];
            }
        }
    },
    mounted(){
        this.listarPagos();
    }

}
Vue.createApp(mispagos).mount("#pagos");