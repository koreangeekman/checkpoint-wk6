<template>
  <i class="fs-1 text-primary mdi mdi-skip-backward" type="button" @click="changePage(currentPage.prevPage)"
    :disabled="!currentPage.prevPage"></i>
  <p class="mb-0 fs-4">{{ currentPage.page }} of {{ currentPage.totalPages }}</p>
  <i class="fs-1 text-primary mdi mdi-skip-forward" type="button" @click="changePage(currentPage.nextPage)"
    :disabled="!currentPage.nextPage"></i>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";


export default {
  setup() {
    return {
      currentPage: computed(() => AppState.currentPage),

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


<style lang="scss" scoped></style>