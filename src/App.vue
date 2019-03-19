<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

html {
  font-family: "Segoe UI Light", sans-serif;
}

#app {
  width: 100vw;
  margin: 0 auto;
}

@media (min-width: 599px) {
  #app {
    width: 50vw;
  }
}
</style>

