<template>
  <i class="btn btn-primary fs-2 px-2 py-0 mdi mdi-skip-backward" type="button" @click="changePage(currentPage.prevPage)"
    :disabled="!currentPage.prevPage"></i>
  <p class="mb-0 fs-5">Page {{ currentPage.page }} of {{ currentPage.totalPages }}</p>
  <i class="btn btn-primary fs-2 px-2 py-0 mdi mdi-skip-forward" type="button" @click="changePage(currentPage.nextPage)"
    :disabled="!currentPage.nextPage"></i>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { CurrentPage } from "../models/CurrentPage.js";


export default {
  props: { currentPage: { type: CurrentPage } },

  setup() {

    return {

      async changePage(page) {
        try {
          postsService.getPostsByPage(page);
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },

    }
  }
};
</script>


<style lang="scss" scoped>
i.btn {
  line-height: 2rem;
}
</style>