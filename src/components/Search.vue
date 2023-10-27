<template>
  <form @submit.prevent="searchPosts()" class="d-flex">
    <input v-bind="query" class="form-control mx-3" type="text" id="query" maxlength="30" required>
    <button class="btn btn-success d-flex" type="submit">Search<i class=" mdi mdi-magnify"></i></button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const query = ref('')
    return {
      async searchPosts() {
        await postsService.getPostsByQuery(query)
      },
    }
  }
};
</script>


<style lang="scss" scoped></style>