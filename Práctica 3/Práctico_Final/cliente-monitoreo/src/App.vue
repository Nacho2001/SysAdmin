<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="fa fa-internet-explorer me-1" style="font-size:24px"></i>TP final</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/cliente"><i class="fa fa-user-circle-o me-1"></i>Cliente Vue</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cpu"><i class="fa fa-microchip me-1"></i>Datos CPU</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/drive"><i class="fa fa-hdd-o me-1"></i>Datos DRIVE</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/memory"><i class="fa fa-server me-1">Memoria</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/netstat"><i class="fa fa-wifi me-1"></i>Netstat</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/os"><i class="fa fa-android me-1"></i>Datos OS</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-3">
    <router-view/>
  </div>
</template>
<style>
</style>
