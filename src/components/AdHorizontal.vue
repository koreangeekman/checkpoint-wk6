<template>
  <img :src="ad.banner" :alt="ad.title" :href="ad.linkUrl" class="my-2 img-fluid">
</template>


<script>
import { Ad } from "../models/Ad.js";

export default {
  props: { ad: { type: Ad } },

  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>