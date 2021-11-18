<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TP final</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/cliente">Cliente Vue</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cpu">Datos CPU</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/drive">Datos DRIVE</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/memory">Memoria</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/netstat">Netstat</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/os">Datos OS</router-link>
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
