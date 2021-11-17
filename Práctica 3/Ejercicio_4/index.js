const mispropiedades = {

    data(){
        return {
            descripcion:'',
            tiempo:'',
            lista_tareas:[],
            indice:null
        }

    },

    methods: {
        guardar_tarea(){
            const nuevaTarea = {
                descripcion:this.descripcion,
                tiempo:this.tiempo
            }

            if("tareas" in localStorage){
                this.lista_tareas = JSON.parse(localStorage.getItem("tareas")); //busca la lista existente
                this.lista_tareas.push(nuevaTarea); //revisa
                localStorage.setItem("tareas",JSON.stringify(this.lista_tareas)); //agrega nuevo elemento
            }else{
                this.lista_tareas.push(nuevaTarea); //revisa la lista
                localStorage.setItem("tareas",JSON.stringify(this.lista_tareas)) 
            } //si la tarea no existe, la crea y la guarda en un arreglo

            this.descripcion = '';
            this.tiempo = '';
        },
        listarTareas(){
            if("tareas" in localStorage)
            {
                this.lista_tareas = JSON.parse(localStorage.getItem("tareas")); //carga la lista
            }else{
                this.lista_tareas = []; //lista las tareas
            }

        },
        eliminarTarea(index){
            this.lista_tareas.splice(index,1) //elimina 1 elemento
            localStorage.setItem("tareas",JSON.stringify(this.lista_tareas))
        },

        eliminar(){ //borra todo
            localStorage.removeItem("tareas");
            this.listarTareas();

        },

        llenar_formulario(index){  //llena el formulario con datos de una tarea
            this.descripcion = this.lista_tareas[index].descripcion;
            this.tiempo = this.lista_tareas[index].tiempo;
            this.indice = index;  //actualiza indice del boton actualizar

        },

        actualizar(){
            this.lista_tareas[this.indice].descripcion = this.descripcion; //actualizar tareas
            this.lista_tareas[this.indice].tiempo = this.tiempo; //atualizar tareas
            localStorage.setItem("tareas",this.lista_tareas); // actualizar localstorage
            this.descripcion = ''; this.tiempo = '';
            this.indice = null; // vacia el indice luego de la actualización (no se puede actualizar 2 veces)
        }
    },
    mounted(){
        this.listarTareas(); //primero ejecuta listar tareas

    }

}
Vue.createApp(mispropiedades).mount("#app");