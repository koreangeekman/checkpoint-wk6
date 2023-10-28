<template>
  <div class="container-fluid">
    <section class="row">

      <div class="col-12 col-lg-6">
        <section class="row">
          <div class="col-12" v-for="profile in profiles" :key="profile.id">
            <UserProfile :profile="profile" />
          </div>
        </section>
      </div>

      <div class="col-12 col-lg-6">
        <section class="row">
          <div class="col-12 d-flex justify-content-between">
            <Pagination :currentPage="currentPage" />
          </div>
          <div class="col-12" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
          <div class="col-12 d-flex justify-content-between">
            <Pagination :currentPage="currentPage" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { profilesService } from "../services/ProfilesService.js";
import UserProfile from "../components/UserProfile.vue";
import Pagination from "../components/Pagination.vue";
import PostCard from "../components/PostCard.vue";
import { postsService } from "../services/PostsService.js";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    // const route = useRoute();

    // async function _getProfilesByQuery() {
    //   try {
    //     await profilesService.getProfilesByQuery(route.query.query);
    //   }
    //   catch (error) {
    //     logger.error(error);
    //     Pop.error(error);
    //   }
    // };

    // async function _getPostsByQuery() {
    //   try {
    //     await postsService.getPostsByQuery(route.query.query);
    //   }
    //   catch (error) {
    //     logger.error(error);
    //     Pop.error(error);
    //   }
    // };

    onMounted(() => {
      // profilesService.clearData();
      // postsService.clearData();
      // _getProfilesByQuery();
      // _getPostsByQuery();
    });

    return {
      // query: route.query.query,
      profiles: computed(() => AppState.profiles),
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),

      // async searchProfilesAndPosts() {
      //   _getPostsByQuery();
      //   _getProfilesByQuery();
      // }
    };
  },
  components: { UserProfile, PostCard, Pagination }
};
</script>


<style lang="scss" scoped></style>