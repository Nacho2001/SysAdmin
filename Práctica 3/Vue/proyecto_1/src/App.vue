<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">VUE 3</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/notas">Notas principales</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/publicaciones">Publicaciones</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/leydeohm">Ley de Ohm</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pitagoras">Pitágoras</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cliente">Cliente</router-link>
          </li>         
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <router-view/>
  </div>
</template>

<style>

</style>
