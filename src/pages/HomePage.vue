<template>
  <div class="container-fluid">
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
    };
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss">
// .
</style>
