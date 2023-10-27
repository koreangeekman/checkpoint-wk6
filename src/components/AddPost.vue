<template>
  <section class="row align-items-center">
    <div class="col-12 col-lg-3">
      <hr>
      <div class="text-center postingAs">
        <img :src="account.picture" :alt="account.name" class="rounded-circle">
        <p class="fs-5">Posting as: <b>{{ account.name }}</b></p>
      </div>
      <hr>
    </div>
    <div class="col-12 col-lg-9">
      <form @submit.prevent="createPost()" class="">
        <p class="fs-3">Add a new post?</p>
        <div class="mb-3">
          <textarea v-model="postBody.body" class="form-control" name="body" id="body" rows="3"></textarea>
        </div>
        <span class="d-flex justify-content-between align-items-center">
          <div class="mb-3">
            <label for="imgUrl" class="form-label"><small>[Optional]</small> Add an image:</label>
            <input v-model="postBody.imgUrl" class="form-control" type="url" name="imgUrl" id="imgUrl">
          </div>
          <button class="btn btn-success" type="submit">Create Post</button>
        </span>
      </form>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";

export default {
  setup() {
    const postBody = ref({})
    return {
      postBody,
      account: computed(() => AppState.account),

      async createPost() {
        try {
          await postsService.createPost(postBody.value)
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.postingAs img {
  width: 5rem;
}
</style>