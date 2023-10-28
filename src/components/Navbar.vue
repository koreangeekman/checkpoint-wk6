<template>
  <nav class="navbar navbar-expand-lg px-3">
    <div class="d-flex w-100 justify-content-between align-items-center">

      <div v-if="route.name != 'Search'">
        <router-link :to="{ name: 'Search' }">
          <!-- <Search /> -->
          <button class="btn btn-success d-flex" type="button">Search<i class="ps-1 mdi mdi-magnify"></i></button>
        </router-link>
      </div>
      <div v-else>&nbsp;</div>

      <Login />

      <router-link :to="{ name: 'Home' }">
        <i class="fs-1 me-5 mdi mdi-home"></i>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import Login from './Login.vue';
import Search from "./Search.vue";

export default {

  setup() {
    const route = useRoute();

    return {
      route,
    }
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
