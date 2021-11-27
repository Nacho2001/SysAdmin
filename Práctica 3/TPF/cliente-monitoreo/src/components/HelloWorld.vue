<template>
  <div class="hello">
    <h1>Bienvenid@s al Proyecto Final!!</h1>
    <h3>Acceso rápido a los componentes:</h3>
    <div class="row">
      <router-link class="nav-link" to="/cliente"><i class="fa fa-user-circle-o me-1"></i>Cliente Vue</router-link>
      <router-link class="nav-link" to="/cpu"><i class="fa fa-tachometer me-1"></i>Datos CPU</router-link>
      <router-link class="nav-link" to="/drive"><i class="fa fa-server me-1"></i>Datos DRIVE</router-link>
      <router-link class="nav-link" to="/memory"><i class="fa fa-microchip me-1"></i>Memoria</router-link>
      <router-link class="nav-link" to="/netstat"><i class="fa fa-wifi me-1"></i>Netstat</router-link>
      <router-link class="nav-link" to="/os"><i class="fa fa-desktop me-1"></i>Datos OS</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
