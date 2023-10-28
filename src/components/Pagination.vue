<template>
  <i class="btn btn-primary fs-1 px-2 py-0 mdi mdi-skip-backward" type="button" @click="changePage(currentPage.prevPage)"
    :disabled="currentPage.prevPage == null"></i>
  <p class="mb-0 fs-4">{{ currentPage.page }} of {{ currentPage.totalPages }}</p>
  <i class="btn btn-primary fs-1 px-2 py-0 mdi mdi-skip-forward" type="button" @click="changePage(currentPage.nextPage)"
    :disabled="currentPage.nextPage == null"></i>
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
      // currentPage: computed(() => AppState.currentPage),

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
  line-height: 3rem;
}
</style>