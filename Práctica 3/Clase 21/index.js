const articulos = {

    data(){
        return {
            titulo:'',
            url:'',
            lista_articulos:[]
        }

    },

    methods:{
        guardar_articulo(){
            let articulo = {
                titulo:this.titulo,
                url:this.url
            }

            this.lista_articulos.push(this.articulo)

            this.titulo= ''; this.url= ''
        },
        mounted(){
            this.articulo();
        }
        
    }



}


Vue.createApp(articulos).mount("#art")