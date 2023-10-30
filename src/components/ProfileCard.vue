<template>
  <section class="row bgImg justify-content-between shadow rounded m-1 m-md-3 py-3 px-2">
    <div class="col-12 col-md-auto d-flex justify-content-center p-3">
      <router-link :disabled="route.name == 'Profile'" :to="{ name: 'Profile', params: { profileId: profile.id } }">
        <div class="relative">
          <img :src="profile.picture" :alt="profile.name" class="profilePicture rounded-circle">
          <i v-if="profile.graduated" class="absolute grad text-primary rounded-circle mdi mdi-account-school"></i>
        </div>
      </router-link>
      <div class="ps-4">
        <p class="fw-bold fs-1">{{ profile.name }}</p>
        <p class="mb-3">{{ profile.email }}</p>

        <p class="mb-3">Class: <small>{{ profile.class ? profile.class : ' [none set]' }}</small></p>
        <u v-if="profile.resume" :type="profile.resume ? 'button' : ''">
          <p class="mb-3" :title="profile.resume ? 'resume link' : 'no resume linked yet'" :href="profile.resume">
            Resume{{ profile.resume ? ' Link' : ':' }}
            <small>{{ profile.resume ? '' : ' [none set]' }}</small>
          </p>
        </u>

        <p class="fs-5 fw-bold mb-2">Socials</p>
        <span class="d-flex">
          <p class="d-flex align-items-center" title="github link" :href="profile.github"
            :type="profile.github ? 'button' : ''">
            <i class="fs-2 px-2 mdi mdi-github"></i>
            <small v-if="!profile.github"> [none set]</small>
          </p>
          <p class="d-flex align-items-center" title="linkedin" :href="profile.linkedin"
            :type="profile.github ? 'button' : ''">
            <i class="fs-2 px-2 mdi mdi-linkedin"></i>
            <small v-if="!profile.linkedin"> [none set]</small>
          </p>
        </span>

        <p class="fs-5 fw-bold my-2">Account created on</p>
        <p class="" title="Account created at"><small>{{ profile.createdAt.toLocaleDateString() }}</small></p>
      </div>
    </div>
    <div class="col-12 col-md-auto d-flex justify-content-center">
      <img :src="profile.coverImg" :alt="profile.name" class="coverImg rounded">
    </div>
  </section>
</template>


<script>
import { useRoute } from "vue-router";
import { Profile } from "../models/Profile.js";

export default {
  props: { profile: { type: Profile } },

  setup() {
    const route = useRoute();

    return {
      route
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
  object-fit: cover;
  object-position: center;
  max-width: 100%;
  height: 20vh;
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