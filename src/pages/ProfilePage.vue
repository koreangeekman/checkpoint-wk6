<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">

        <section class="row">
          <div class="col-12 pb-4 px-5">
            <UserProfile :profile="activeProfile" />
          </div>
          <hr>
        </section>

        <section class="row justify-content-end">

          <div class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5"
            v-if="currentPage.totalPages > 1">
            <Pagination :currentPage="currentPage" />
          </div>

          <div v-if="posts" v-for="post in posts" :key="post.id" class="col-12 col-lg-9">
            <PostCard :post="post" />
          </div>

          <div v-if="!posts" class="d-flex justify-content-center p-5">
            <p class="mb-0 fs-1">
              Loading... <i class="mdi mdi-swap-horizontal-circle-outline mdi-spin"></i>
            </p>
          </div>

          <div v-if="posts == []" class="text-center p-5">
            <p class="fs-1 fw-bold mb-0">No more posts... <i class="mdi mdi-help-network-outline"></i></p>
          </div>

          <div class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5"
            v-if="currentPage.totalPages > 1">
            <Pagination :currentPage="currentPage" />
          </div>
        </section>

      </div>

      <div class="col-12 col-lg-2">
        <img v-for="ad in ads" :key="ad.title" :src="ad.tall" :alt="ad.title" :href="ad.linkUrl" class="my-2 img-fluid">
      </div>

    </section>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
import Pagination from "../components/Pagination.vue";
import PostCard from "../components/PostCard.vue";
import UserProfile from "../components/UserProfile.vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService.js";


export default {
  setup() {
    const route = useRoute();

    async function _getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    async function _getPostsByProfileId() {
      try {
        await profilesService.getPostsByProfileId(route.params.profileId);
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      postsService.clearData();
      _getProfileById();
      _getPostsByProfileId();
    })

    return {
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads)
    };
  },
  components: { UserProfile, Pagination, PostCard }
};
</script>


<style lang="scss" scoped></style>