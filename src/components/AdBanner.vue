<template>
  <img v-if="ads.length == 2" :src="ads[ad].banner" :alt="ads[ad].title" :href="ads[ad].linkUrl" class="my-2 img-fluid">
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { adsService } from "../services/AdsService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  props: { ad: { type: Number } },

  setup() {

    async function _getAds() {
      try {
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }

    onMounted(() => {
      _getAds();
    })

    return {
      ads: computed(() => AppState.ads),

    }
  }
};
</script>


<style lang="scss" scoped></style>