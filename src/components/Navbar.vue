<template>
  <nav class="navbar px-3 py-0">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <span class="d-flex align-items-center">
        <router-link :to="{ name: 'Home' }">
          <i class="fs-1 mx-3 mdi mdi-home"></i>
        </router-link>

        <div v-if="route.name != 'Search'">
          <router-link :to="{ name: 'Search' }">
            <!-- <Search /> -->
            <button class="ms-3 btn btn-success d-flex" type="button">Search<i class="ps-1 mdi mdi-magnify"></i></button>
          </router-link>
        </div>
        <div v-else class="me-md-5 pe-md-5">&nbsp;</div>
      </span>

      <div v-if="route.name == 'Account'" class="ms-md-5 ps-md-5">
        <p class="mb-0 fs-3 p-2 text-center text-white fw-bold">Edit profile?</p>
      </div>
      <div v-if="route.name == 'Search'" class="ms-md-5 ps-md-5">
        <p class="mb-0 fs-3 p-2 text-center text-white fw-bold">Search Page</p>
      </div>
      <div v-if="route.name == 'Profile'" class="ms-md-5 ps-md-5">
        <p class="mb-0 fs-3 p-2 text-center text-white fw-bold">Profile Page</p>
      </div>


      <Login />

    </div>
  </nav>
  <hr>
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

nav {
  background-image: linear-gradient(to right, #38c4c6, #8eded8);
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
