<template>
  <form @submit.prevent="_searchProfilesAndPosts()" class="d-flex">
    <input v-model="search" class="form-control mx-3" type="text" maxlength="30">
    <button class="btn btn-success d-flex" type="submit">Search<i class=" mdi mdi-magnify"></i></button>
  </form>
</template>


<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const search = ref('');

    async function _getProfilesByQuery(query) {
      try {
        await profilesService.getProfilesByQuery(query);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    };

    async function _getPostsByQuery(query) {
      try {
        await postsService.getPostsByQuery(query);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    };

    async function _searchProfilesAndPosts() {
      let query = route.query.query
      if (search.value) {
        query = search.value;
      }
      _getProfilesByQuery(query);
      _getPostsByQuery(query);
    }
    onMounted(() => {
      _searchProfilesAndPosts();
    });

    return {
      search,
    }
  }
};
</script>


<style lang="scss" scoped></style>