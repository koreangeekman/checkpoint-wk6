<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="d-flex justify-content-center">

    <form class="card p-3" @submit.prevent="updateProfile()">
      <div class="d-flex p-3 justify-content-between">
        <section class="user pe-3">
          <span class="m-2">
            <label for="name">Name</label>
            <input v-model="editable.name" class="ms-2 form-control" type="text" id="name">
          </span>
          <br>
          <span class="m-2">
            <label for="picture">User Picture URL</label>
            <input v-model="editable.picture" class="ms-2 form-control" type="url" id="picture">
          </span>
          <br>
          <div class="d-flex justify-content-between">
            <span class="m-2">
              <label for="class">Cohort</label>
              <input v-model="editable.class" class="ms- form-control" type="text" id="class">
            </span>
            <span class="my-2 me-2 ps-3 pt-1 text-end">
              <label for="graduated">Graduated?</label>
              <br>
              <input v-model="editable.graduated" type="checkbox" id="graduated" name="graduated">
            </span>
          </div>
        </section>

        <section class="socials">
          <span class="m-2">
            <label for="github">Github</label>
            <input v-model="editable.github" class="ms-2 form-control" type="url" id="github">
          </span>
          <br>
          <span class="m-2">
            <label for="linkedin">LinkedIn</label>
            <input v-model="editable.linkedin" class="ms-2 form-control" type="url" id="linkedin">
          </span>
          <br>
          <span class="m-2">
            <label for="resume">Resume</label>
            <input v-model="editable.resume" class="ms-2 form-control" type="text" id="resume">
          </span>
        </section>
      </div>

      <div class="">
        <div class="mx-2 mb-3 px-3">
          <label for="bio">Bio</label>
          <textarea class="ms-2 form-control" name="bio" id="bio" rows="3"></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-end pe-3">
        <button class="btn btn-success">Submit</button>
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
  max-width: 100px;
}

form {
  width: 42rem;
}

form button {
  width: fit-content;
}
</style>
