<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">

        <section class="row">
          <div class="col-12 pb-4 px-5">
            <AddPost />
          </div>
          <hr>
        </section>

        <section class="row justify-content-end">

          <div v-if="currentPage.totalPages > 1"
            class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5">
            <Pagination :currentPage="currentPage" />
          </div>

          <div v-for="post in posts" :key="post.id" class="col-12 col-lg-9">
            <PostCard :post="post" />
          </div>

          <!-- <div v-if="posts == []" class="text-center p-5">
            <p class="fs-1 fw-bold mb-0">No more posts... <i class="mdi mdi-help-network-outline"></i></p>
          </div> -->

          <div v-if="currentPage.totalPages > 1"
            class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5">
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
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import AddPost from "../components/AddPost.vue";
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";
import { adsService } from "../services/AdsService";

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
      _getPostsAndAds();
    });
    return {
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads)
    };
  },
  components: { AddPost, Pagination, PostCard }
}
</script>

<style scoped lang="scss">
.listPosts {
  height: 93vh;
  overflow-y: scroll;
}
</style>
