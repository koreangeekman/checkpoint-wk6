<template>
  <div class="d-flex bgImg align-items-center justify-content-between shadow m-3 p-3">
    <section class="d-flex">
      <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
        <div class="relative">
          <img :src="profile.picture" :alt="profile.name" class="profilePicture rounded-circle">
          <i v-if="profile.graduated" class="absolute grad text-primary rounded-circle mdi mdi-account-school"></i>
        </div>
      </router-link>
      <span class="px-4">
        <p class="fw-bold fs-3">{{ profile.name }}</p>
        <p class="">{{ profile.email }}</p>
        <p class="">Class: <small>{{ profile.class ? '' : '[none set]' }}</small></p>
        <p class="" title="resume link" :href="profile.resume">Resume: <small>{{ profile.resume ? '' : '[none set]'
        }}</small></p>
      </span>
    </section>
    <span class="d-block px-4">
      <p class="fs-5 fw-bold mb-2">Socials</p>
      <p class="" title="github link" :href="profile.github"><i class="fs-4 mdi mdi-github"></i>
        <small>{{ profile.github ? '' : '[none set]' }}</small>
      </p>
      <p class="" title="linkedin" :href="profile.linkedin"><i class="fs-4 mdi mdi-linkedin"></i>
        <small>{{ profile.linkedin ? '' : '[none set]' }}</small>
      </p>
      <p class="fs-5 fw-bold my-2">Account</p>
      <p class="" title="Account created at"><small>{{ profile.createdAt.toLocaleDateString() }}</small></p>
    </span>
    <img :src="profile.coverImg" :alt="profile.name" class="coverImg rounded">
  </div>
</template>


<script>
import { Profile } from "../models/Profile.js";

export default {
  props: { profile: { type: Profile } },

  setup() {
    return {
    }
  }
};
</script>


<style lang="scss" scoped>
.bgImg {
  // background-image: url(props.profile.coverImg);
  background-position: center;
  background-size: cover;
}

.coverImg {
  max-height: 12rem;
  max-width: 12rem;
  object-fit: cover;
}

.profilePicture {
  height: 8rem;
  width: 8rem;
}

.absolute {
  position: absolute;
  bottom: -12px;
  right: -12px;
}

.relative {
  position: relative;
}

.grad {
  background-color: #fff;
  font-size: 2rem;
  height: 3.2rem;
  width: 3.2rem;
  text-align: center;
}

p {
  margin-bottom: 0;
}
</style>