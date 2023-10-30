<template>
  <div class="d-block card shadow p-3 m-3">

    <span class="header d-flex justify-content-between align-items-center">

      <span class="align-items-center d-flex">
        <router-link :disabled="route.name == 'Profile'" :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img :src="post.creator.picture" :alt="post.creator.name" class="rounded-circle authorImg">
        </router-link>
        <div class="d-block p-3">
          <p class="mb-0 fw-bold fs-5">{{ post.creator.name }}</p>
          <span class="d-flex align-items-center">
            <p class="mb-0 text-secondary">
              {{ post.createdAt.toLocaleDateString() + ' @ ' + post.createdAt.toLocaleTimeString() }}
            </p>
            <i v-if="post.creator.graduated" class="m-0 mx-2 fs-4 text-primary mdi mdi-account-school"></i>
          </span>
        </div>
      </span>
      <span class="d-flex px-3">
        <i v-if="post.creatorId == account.id" type="button" @click="editPost(post)" title="Edit Post"
          class="px-3 fs-1 editButton text-primary mdi mdi-file-edit"></i>
        <i v-if="post.creatorId == account.id" type="button" @click="removePost(post.id)" title="Delete Post"
          class="px-3 fs-1 editButton text-danger mdi mdi-trash-can"></i>
      </span>

    </span>

    <hr>

    <p class="p-2">{{ post.body }}</p>
    <img v-if="post.imgUrl" :src="post.imgUrl" alt="image for post" class="postImg">

    <hr>

    <span class="d-flex justify-content-end">
      <div type="button" class="px-2" @click="toggleLike(post.id)">
        <i v-if="post.likeIds.find(like => like.id == account.id)" class="fs-3 text-primary mdi mdi-heart"></i>
        <i v-else class="fs-3 text-primary mdi mdi-heart-outline"></i>
      </div>
      <p class="mb-0">{{ post.likes.length }}</p>
    </span>
  </div>
</template>


<script>
import { computed } from "vue";
import { Post } from "../models/Post";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";


export default {
  props: { post: { type: Post } },

  setup() {
    const route = useRoute();

    return {
      route,

      account: computed(() => AppState.account),

      async toggleLike(postId) {
        try {
          postsService.toggleLike(postId);
        } catch (error) {
          logger.error(error);
          Pop.error(error);
        }
      },

      async removePost(postId) {
        try {
          postsService.removePost(postId);
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
.mdi {
  line-height: 1.5rem;
}

.postImg {
  max-height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.authorImg {
  height: 6rem;
  width: 6rem;
  object-fit: cover;
  object-position: center;
}
</style>