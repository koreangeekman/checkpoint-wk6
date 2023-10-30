<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">

        <section class="row p-3">
          <div v-if="profile" class="col-12 pb-4 px-md-5">
            <ProfileCard :profile="profile" />
          </div>
          <div v-else-if="invalid" class="col-12 pb-4 px-5">
            <div class="fs-3 text-center text-muted p-5">
              <i class="fs-1 mdi mdi-not-equal-variant"></i><br>
              <b>Invalid Profile ID</b><br>
              <i class="fs-1 mdi mdi-not-equal-variant"></i>
            </div>
          </div>
          <div v-else class="col-12 pb-4 px-5">
            <div class="fs-3 text-center text-muted p-5">
              Loading profile.. <i class="mdi mdi-tire mdi-spin"></i>
            </div>
          </div>
          <hr>
        </section>

        <section class="row justify-content-end">

          <div class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5"
            v-if="currentPage.totalPages > 1">
            <Pagination :currentPage="currentPage" />
          </div>
          <div v-if="posts.length > 0" class="col-12 col-lg-9">
            <div v-for="post in posts" :key="post.id">
              <PostCard :post="post" />
            </div>
          </div>
          <div v-else-if="invalid"></div>
          <div v-else class="d-flex justify-content-center p-5">
            <p class="mb-0 fs-1">
              Loading posts... <i class="mdi mdi-swap-horizontal-circle-outline mdi-spin"></i>
            </p>
          </div>

          <div v-if="posts == []" class="text-center p-5">
            <p class="fs-1 fw-bold mb-0">No posts found... <i class="mdi mdi-help-network-outline"></i></p>
          </div>

          <div class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5"
            v-if="currentPage.totalPages > 1">
            <Pagination :currentPage="currentPage" />
          </div>

          <div class="col-12 col-lg-9 pb-2">
            <div v-if="posts.length >= 1 && currentPage.totalPages == 1" class="text-center py-3">
              <small>[ {{ posts.length }} post{{ posts.length > 1 ? 's' : '' }} found ]</small>
            </div>
          </div>
        </section>

      </div>

      <div class="col-12 col-lg-2">
        <div v-for="ad in ads" :key="ad.title">
          <AdTall :ad="ad" />
        </div>
      </div>

    </section>
  </div>
</template>


<script>
import { computed, onMounted } from "vue";
import ProfileCard from "../components/ProfileCard.vue";
import Pagination from "../components/Pagination.vue";
import PostCard from "../components/PostCard.vue";
import AdTall from "../components/AdTall.vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService.js";
import { postsService } from "../services/PostsService.js";
import { adsService } from "../services/AdsService.js";


export default {
  setup() {
    const route = useRoute();

    async function _getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId);
      } catch (error) {
        AppState.invalid = true;
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

    async function _getAds() {
      try {
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      postsService.clearData();
      profilesService.clearData();
      adsService.clearPending();

      _getProfileById();
      _getPostsByProfileId();
      _getAds();
    });

    return {
      route,

      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads),
      invalid: computed(() => AppState.invalid),
    };
  },
  components: { ProfileCard, Pagination, PostCard, AdTall }
};
</script>


<style lang="scss" scoped></style>