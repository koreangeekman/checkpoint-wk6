<template>
  <form @submit.prevent="searchProfilesAndPosts()" class="d-flex">
    <input v-model="search" class="form-control mx-3" type="text" maxlength="30">
    <button class="btn btn-success d-flex" type="submit">Search<i class="ps-1 mdi mdi-magnify"></i></button>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { profilesService } from "../services/ProfilesService.js";

export default {

  setup() {
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
    }

    async function _getPostsByQuery(query) {
      try {
        await postsService.getPostsByQuery(query);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    return {
      search,

      async searchProfilesAndPosts() {
        profilesService.clearData();
        postsService.clearData();

        router.push({ path: 'search', query: { query: search.value } })

        _getProfilesByQuery(search.value);
        _getPostsByQuery(search.value);
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>