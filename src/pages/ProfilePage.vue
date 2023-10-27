<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">
        <section class="row">
          <div class="col-12 pb-4 px-5">
            <UserProfile />
          </div>
          <hr>
        </section>
        <section class="row justify-content-end">

          <div class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5"
            v-if="currentPage.totalPages > 1">
            <Pagination />
          </div>

          <div v-for="post in posts" :key="post.id" class="col-12 col-lg-9">
            <PostCard :post="post" />
          </div>

          <div v-if="posts = []" class="text-center p-5">
            <p class="fs-1 fw-bold mb-0">No more posts... <i class="mdi mdi-help-network-outline"></i></p>
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
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService";


export default {
  setup() {
    const route = useRoute();

    async function _getProfileById() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    async function _getPostsByProfileId() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getPostsByProfileId(profileId);
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    onMounted(() => {
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
  components: { Pagination, PostCard }
};
</script>


<style lang="scss" scoped></style>