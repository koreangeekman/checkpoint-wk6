<template>
  <div class="container-fluid">

    <section class="row">
      <div class="col-12 d-flex justify-content-center px-5 py-3">
        <div class="card p-3">
          <Search />
        </div>
      </div>
    </section>
    <section class="row">
      <div v-if="!route.query.query" class="col-12 text-center py-3">
        <p class="mb-0">
          <small>[ Please enter a query.. ]</small>
        </p>
      </div>
      <div class="mb-3"></div>
      <hr>
    </section>

    <section class="row">
      <div class="col-12 col-lg-6">
        <section v-if="profiles.length >= 1 && route.query.query" class="row">

          <div class="col-12" v-for="profile in profiles" :key="profile.id">
            <UserProfile :profile="profile" />
          </div>

          <div v-if="profiles.length >= 1" class="text-center py-3">
            <small>[ {{ profiles.length }} profile{{ profiles.length > 1 ? 's' : '' }} found ]</small>
          </div>

        </section>

        <section v-if="searching" class="row text-center py-3">
          <div class="col-12 fs-3 text-center text-muted p-5">
            Searching profiles.. <i class="mdi mdi-tire mdi-spin"></i>
          </div>
        </section>

        <section v-if="route.query.query && profiles.length == 0 && !searching" class="row">
          <div class="col-12 fs-3 text-center text-muted p-5">
            No profile matches... <i class="mdi mdi-note-off-outline"></i>
          </div>
        </section>

      </div>

      <div class="col-12 col-lg-6">
        <section v-if="posts.length >= 1 && route.query.query" class="row">

          <div v-if="currentPage.totalPages > 1" class="col-12 d-flex justify-content-between">
            <Pagination :currentPage="currentPage" />
          </div>

          <div class="col-12" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>

          <div v-if="currentPage.totalPages > 1" class="col-12 d-flex justify-content-between">
            <Pagination :currentPage="currentPage" />
          </div>

          <div v-if="posts.length >= 1 && currentPage.totalPages == 1" class="text-center py-3">
            <small>[ Only {{ posts.length }} post{{ posts.length > 1 ? 's' : '' }} found.. ]</small>
          </div>

        </section>

        <section v-if="searching" class="row text-center py-3">
          <div class="col-12 fs-3 text-center text-muted p-5">
            Searching profiles.. <i class="mdi mdi-tire mdi-spin"></i>
          </div>
        </section>

        <section v-if="route.query.query && posts.length == 0 && !searching" class="row">
          <div class="col-12 fs-3 text-center text-muted p-5">
            No post matches... <i class="mdi mdi-note-off-outline"></i>
          </div>
        </section>

      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { profilesService } from "../services/ProfilesService.js";
import UserProfile from "../components/UserProfile.vue";
import Pagination from "../components/Pagination.vue";
import PostCard from "../components/PostCard.vue";
import Search from "../components/Search.vue";
import { postsService } from "../services/PostsService.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();

    async function _getProfilesByQuery(query) {
      try {
        await profilesService.getProfilesByQuery(query);
        AppState.searching = false;
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    };

    async function _getPostsByQuery(query) {
      try {
        await postsService.getPostsByQuery(query);
        AppState.searching = false;
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    };

    onMounted(() => {
      profilesService.clearData();
      postsService.clearData();

      let query = route.query.query;
      if (!query) { return }
      _getProfilesByQuery(query);
      _getPostsByQuery(query);
    });

    return {
      route,

      searching: computed(() => AppState.searching),
      profiles: computed(() => AppState.profiles),
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),

    };
  },
  components: { UserProfile, PostCard, Pagination, Search }
};
</script>


<style lang="scss" scoped></style>