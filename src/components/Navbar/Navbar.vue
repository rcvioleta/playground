<template>
  <div id="navbar__main">
    <nav>
      <div class="brand">
        <router-link :to="{name:'index'}">
          <h1>Receipe Master</h1>
        </router-link>
      </div>
      <div class="add-receipe">
        <span class="add-receipe__btn">
          <router-link :to="{name:'new receipe'}">&#10010;</router-link>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
#navbar__main {
  background-color: teal;
  padding: 0.5em;
}

#navbar__main nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-auto-rows: 10vh;
}

.brand {
  width: 65vw;
}

.brand a {
  text-align: right;
  color: #004e4e;
  font-family: inherit;
  text-transform: uppercase;
  line-height: 2em;
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
}

.add-receipe {
  text-align: right;
}

.brand,
.add-receipe {
  padding: 0.5rem;
}

.add-receipe__btn a {
  text-align: center;
  border: none;
  padding: 0.1em;
  width: 1.3em;
  font-size: 2.5em;
  border-radius: 50%;
  color: #004e4e;
  cursor: pointer;
  outline: none;
}

a {
  text-decoration: none;
}
</style>
