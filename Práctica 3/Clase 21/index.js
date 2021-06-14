const articulos = {

    datos(){
        return {
            titulo:'',
            url:'',
            lista_articulos:[]
        }

    },

    methods: {
        guardar_articulo(){
            let articulo = {
                titulo:this.titulo,
                url:this.url
            }

            this.lista_articulos.push(this.guardar_articulo)

            this.titulo='', this.url=''
        }
        
    },
    mounted(){
        
    }


}
Vue.createApp(articulos).mount("#art")