<template>
  <div class="container-fluid">
    <section class="row" v-if="currentPage.totalPages > 1">
      <div class="col-12 d-flex justify-content-between align-items-center px-5">
        <Pagination />
      </div>
    </section>
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="col-12">
        <PostCard :post="post" />
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
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";

export default {
  setup() {
    async function _getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      _getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage)
    };
  },
  components: { Pagination, PostCard }
}
</script>

<style scoped lang="scss">
// .
</style>
