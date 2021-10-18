<template>
    <div class="row">
    <h3>Recibiendo datos</h3>
        <div class="col-4">
            <div class="card">
                <div class="card-header text-center"><b>RANDOM</b></div>
                    <div class="card-body text-center">
                        <h1>{{valor_recibido}}</h1>    
                    </div>
                    <div class="card-footer">
                        <h4>{{estado}}</h4>
                    </div>                
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client'
export default {
    name:'SocketIndicador',
    data() {
        return {
            valor_recibido:null,
            estado:''
        }
    },
    methods:{
        capturar_random(){
            //tenemos que conectarnos y/o vincular nuestro cliente con el servidor
            const socket  = io("http://localhost:3000")

            socket.on('dato-socket', (valor) => {
                this.valor_recibido = valor.toFixed(2);
                if(this.valor_recibido > 0.7){
                    this.estado = "Elevado"
                }else{
                    this.estado = "Normal"
                }
            })
        }
    },
    mounted(){
        this.capturar_random()
    }
}
</script>