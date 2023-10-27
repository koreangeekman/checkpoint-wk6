<template>
  <nav class="navbar navbar-expand-lg px-3">
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
      <ul class="navbar-nav me-auto">
        <Search />
        <!-- <li>
          <router-link :to="{ name: 'About' }" class="btn lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li> -->
      </ul>
    </div>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <i class="fs-1 me-5 mdi mdi-home"></i>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</template>

<script>
import Login from './Login.vue';
import Search from "./Search.vue";
export default {
  setup() {
    return {}
  },
  components: { Login, Search }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
