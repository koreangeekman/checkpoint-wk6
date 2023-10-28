<template>
  <div class="d-flex bgImg align-items-center">
    <div class="relative">
      <img :src="profile.picture" :alt="profile.name" class="profileImg rounded-circle">
      <i v-if="!profile.graduated" class="m-0 mx-2 abs text-primary rounded-circle mdi mdi-account-school"></i>
    </div>
    <span class="mx-3">
      <p class="fw-bold fs-1">{{ profile.name }}</p>
      <p class="fs-4">{{ profile.email }}</p>
      <span class="d-flex">
        <p class="fs-4">{{ profile.class }}</p>
      </span>
    </span>
  </div>
</template>


<script>
import { computed } from "vue";
import { Profile } from "../models/Profile.js";
import { AppState } from "../AppState.js";

export default {
  props: { profile: { type: Profile, required: true } },

  setup() {
    return {
      // profile: computed(() => AppState.activeProfile)
    }
  }
};
</script>


<style lang="scss" scoped>
.bgImg {
  background-image: url(props.profile.coverImg);
  background-position: center;
  background-size: cover;
}

.profileImg {
  height: 10rem;
  width: 10rem;
}

i {
  background-color: #fff;
  font-size: 2rem;
  height: 3.2rem;
  width: 3.2rem;
  text-align: center;
}

.abs {
  position: absolute;
  bottom: -12px;
  right: -12px;
}

.relative {
  position: relative;
}

p {
  margin-bottom: 0;
}
</style>