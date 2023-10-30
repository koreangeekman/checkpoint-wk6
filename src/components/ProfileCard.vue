<template>
  <section class="row bgImg justify-content-between shadow rounded m-1 m-md-3 py-3 px-2">
    <div class="col-12 col-md-auto d-flex justify-content-center p-3"
      :class="route.name == 'Search' ? 'align-items-center' : ''">
      <router-link :disabled="route.name == 'Profile'" :to="{ name: 'Profile', params: { profileId: profile.id } }">
        <div class="relative">
          <img :src="profile.picture" :alt="profile.name" class="profilePicture rounded-circle">
          <i v-if="profile.graduated" class="absolute grad text-primary rounded-circle mdi mdi-account-school"></i>
        </div>
      </router-link>
      <div v-if="route.name != 'Search'" class="ps-4">
        <p class="fw-bold fs-1">{{ profile.name }}</p>
        <p class="mb-3">{{ profile.email }}</p>

        <p class="mb-3">Class: <small>{{ profile.class ? profile.class : ' [none set]' }}</small></p>
        <a v-if="profile.resume" class="mb-3" title="resume link" type="button" :href="profile.resume">
          Resume{{ profile.resume ? ' Link' : ':' }}
        </a>
        <p v-else class="mb-3" title="no resume linked yet">
          Resume: <small> [none set]</small>
        </p>

        <p class="fs-5 fw-bold mb-2 mt-3">Socials</p>
        <span class="d-flex">
          <a v-if="profile.github" class="d-flex align-items-center" title="github link" :href="profile.github"
            type="button"><i class="fs-2 px-3 mdi mdi-github"></i>
          </a>
          <p v-else class="d-flex align-items-center" title="github icon">
            <i class="fs-2 px-3 mdi mdi-github"></i><small> [none set]</small>
          </p>

          <a v-if="profile.linkedin" class="d-flex align-items-center" title="linkedin" :href="profile.linkedin"
            type="button"><i class="fs-2 px-3 mdi mdi-linkedin"></i>
          </a>
          <p v-else class="d-flex align-items-center" title="linkedin icon">
            <i class="fs-2 px-3 mdi mdi-linkedin"></i><small>[none set]</small>
          </p>
        </span>

        <p class="fs-5 my-2">Account created on: <small>{{ profile.createdAt.toLocaleDateString() }}</small></p>
      </div>
      <div v-else class="ps-4">
        <p class="fs-3">{{ profile.class ? profile.class : ' [none set]' }}</p>
        <p class="fw-bold fs-1">{{ profile.name }}</p>

      </div>
    </div>
    <div v-if="route.name != 'Search'" class="col-12 col-md-auto d-flex justify-content-center">
      <img :src="profile.coverImg" :alt="profile.name" class="coverImg rounded">
    </div>
    <p v-if="route.name != 'Search'" class="px-4 pt-3">{{ profile.bio }}</p>
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