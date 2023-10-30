<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">

        <section v-if="account.id" class="row">
          <div class="col-12 pb-4 px-5">
            <AddPost />
          </div>
          <hr>
        </section>

        <section class="row justify-content-end">

          <div class="d-block d-md-none col-12 col-lg-2">
            <AdBanner :ad="0" />
          </div>

          <div v-if="currentPage.totalPages > 1"
            class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5">
            <Pagination :currentPage="currentPage" />
          </div>

          <div v-for="post in posts" :key="post.id" class="col-12 col-lg-9">
            <PostCard :post="post" />
          </div>

          <div v-if="currentPage.totalPages > 1"
            class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5">
            <Pagination :currentPage="currentPage" />
          </div>

        </section>

      </div>

      <div class="d-block d-md-none col-12 col-lg-2">
        <AdBanner :ad="1" />
      </div>
      <div class="d-none d-md-block col-12 col-lg-2">
        <div v-for="ad in ads" :key="ad.title">
          <AdTall :ad="ad" />
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { adsService } from "../services/AdsService";
import AddPost from "../components/AddPost.vue";
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";
import AdTall from "../components/AdTall.vue";
import AdBanner from "../components/AdBanner.vue";

export default {
  setup() {

    async function _getPostsAndAds() {
      try {
        await postsService.getPosts();
        await adsService.getAds();
        // await adsService.getAdsByCount(4);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      postsService.clearData();
      adsService.clearPending()

      _getPostsAndAds();
    });

    return {

      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account),

    };
  },
  components: { AddPost, Pagination, PostCard, AdTall, AdBanner }
}
</script>

<style scoped lang="scss">
.listPosts {
  height: 93vh;
  overflow-y: scroll;
}
</style>
