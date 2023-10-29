<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded-circle" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="d-flex justify-content-center">

    <form class="card p-3" @submit.prevent="updateProfile()">
      <p class="mb-0 fs-3 p-2 text-center">Edit profile?</p>

      <hr>

      <div class="d-flex  justify-content-between">
        <section class="user px-3 pb-3">
          <span class="">
            <label for="name">Name</label>
            <input v-model="editable.name" class="ms-2 form-control" type="text" id="name">
          </span>
          <br>
          <span class="">
            <label for="picture">User Picture URL</label>
            <input v-model="editable.picture" class="ms-2 form-control" type="url" id="picture">
          </span>
          <br>
          <div class="d-flex justify-content-between">
            <span class="">
              <label for="class">Cohort</label>
              <input v-model="editable.class" class="ms-2 form-control" type="text" id="class">
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
            <input v-model="editable.github" class="ms-2 form-control" type="url" id="github">
          </span>
          <br>
          <span class="">
            <label for="linkedin">LinkedIn</label>
            <input v-model="editable.linkedin" class="ms-2 form-control" type="url" id="linkedin">
          </span>
          <br>
          <span class="">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" class="ms-2 form-control" type="text" id="resume">
          </span>
        </section>
      </div>

      <div class="">
        <div class="mx-3 mb-3 pe-2">
          <label for="bio">Bio</label>
          <textarea class="ms-2 form-control" name="bio" id="bio" rows="3"></textarea>
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
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const editable = ref({});

    return {
      editable,
      account: computed(() => AppState.account),
      async updateProfile() {
        try {
          accountService.updateAccount(editable.value)
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    }
  }
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
