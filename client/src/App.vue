<template>
  <div id="app" class="container-fluid">
    <div id="nav" class="row">
      <div class="d-flex justify-content-start col-6">
        <router-link :to="{ name: 'home' }"><h1>Bug Logger</h1></router-link>
      </div>
      <div class="d-flex justify-content-end col-6">
        <button class="btn btn-info">Report</button>
      </div>
    </div>
    <div class="row">
      <router-view class="col-12" />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: none;
  color: inherit;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h1 {
  font-family: "Pacifico", cursive;
  color: greenyellow;
}
h1:hover {
  cursor: pointer;
}
</style>
