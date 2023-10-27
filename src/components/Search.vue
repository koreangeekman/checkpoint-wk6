<template>
  <form @submit.prevent="searchPosts()" class="d-flex">
    <input v-model="search" class="form-control mx-3" type="text" maxlength="30">
    <button class="btn btn-success d-flex" type="submit">Search<i class=" mdi mdi-magnify"></i></button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const search = ref('');
    return {
      search,
      async searchPosts() {
        await postsService.getPostsByQuery(search.value)
        // search.value = '';
      },
    }
  }
};
</script>


<style lang="scss" scoped></style>