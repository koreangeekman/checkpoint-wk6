<template>
  <section class="row align-items-center">
    <div class="col-12 col-md-4 d-flex justify-content-center">
      <ad-square :ad="0" />
    </div>
    <div class="col-12 col-md-4 about text-center pb-4">
      <h1>Welcome {{ account.name }}</h1>
      <router-link :disabled="route.name == 'Profile'" :to="{ name: 'Profile', params: { profileId: account.id } }">
        <img class="rounded-circle mt-2 mb-3" :src="account.picture" alt="" />
      </router-link>
      <p>{{ account.email }}</p>
      <p class="mb-0"> Account Created: {{ account.createdAt ? account.createdAt.toLocaleDateString() : '' }}</p>
      <p class="mb-0">Last updated: {{ account.updatedAt ? account.updatedAt.toLocaleDateString() : '' }}</p>
    </div>
    <div class="col-12 col-md-4 d-flex justify-content-center">
      <ad-square :ad="1" />
    </div>
  </section>

  <div class="d-flex justify-content-center">

    <form class="card p-3" @submit.prevent="updateProfile()">
      <p class="mb-0 fs-3 p-2 text-center">Edit profile?</p>

      <hr>

      <div class="d-flex  justify-content-between">
        <section class="user px-3 pb-3">
          <span class="">
            <label for="name">Name</label>
            <input v-model="editable.name" class="ms-2 form-control" type="text" id="name" maxlength="100">
          </span>
          <br>
          <span class="">
            <label for="picture">User Picture URL</label>
            <input v-model="editable.picture" class="ms-2 form-control" type="url" id="picture" maxlength="500">
          </span>
          <br>
          <div class="d-flex justify-content-between">
            <span class="">
              <label for="class">Cohort</label>
              <input v-model="editable.class" class="ms-2 form-control" type="text" id="class" maxlength="100">
            </span>
            <span class="me-1 ps-4 text-end">
              <label for="graduated">Graduated?</label>
              <br>
              <input v-model="editable.graduated" class="checkbox mt-2 me-4" type="checkbox" id="graduated"
                name="graduated">
            </span>
          </div>
        </section>

        <section class="socials pe-4">
          <span class="">
            <label for="github">Github</label>
            <input v-model="editable.github" class="ms-2 form-control" type="url" id="github" maxlength="500">
          </span>
          <br>
          <span class="">
            <label for="linkedin">LinkedIn</label>
            <input v-model="editable.linkedin" class="ms-2 form-control" type="url" id="linkedin" maxlength="500">
          </span>
          <br>
          <span class="">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" class="ms-2 form-control" type="text" id="resume" maxlength="500">
          </span>
        </section>
      </div>

      <div class="">
        <div class="mx-3 mb-3 pe-2">
          <label for="bio">Bio</label>
          <textarea v-model="editable.bio" class="ms-2 form-control" name="bio" id="bio" rows="3"
            maxlength="1000"></textarea>
        </div>
      </div>

      <hr>

      <div class="d-flex justify-content-center pe-3">
        <button class="btn btn-success">Submit Changes</button>
      </div>
    </form>

  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import AdSquare from "../components/AdSquare.vue";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    watchEffect(() => {
      if (AppState.account) {
        editable.value = { ...AppState.account };
      }
      else {
        editable.value = {};
      }
    });
    return {
      editable,
      route,
      account: computed(() => AppState.account),
      async updateProfile() {
        try {
          accountService.updateAccount(editable.value);
        }
        catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    };
  },
  components: { AdSquare }
}
</script>

<style scoped>
img {
  max-width: 10rem;
}

form {
  width: 42rem;
}

form button {
  width: fit-content;
}

.checkbox {
  height: 1.2rem;
  width: 1.2rem;
}
</style>
