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
                dni:this.apellido,
                correo:this.correo,
                cuota:this.cuota,
                importe:this,importe,
                fecha:this.fecha
            }

            if("pagos" in localStorage){
                this.tabla_pagos = JSON.parse(localStorage.getItem("pagos"));
                this.tabla_pagos.push(nuevoPago);
                localStorage.setItem("pagos",JSON.stringify(this.tabla_pagos)); 
            }else{
                this.lista_tareas.push(nuevoPago);
                localStorage.setItem("pagos",JSON.stringify(this.tabla_pagos)) 
            }


        },

        listarPagos(){
            if("pagos" in localStorage){
                this.tabla_pagos = JSON.parse(localStorage.getItem("pagos"));
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