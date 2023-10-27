<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 col-lg-10 listPosts">
        <section class="row">

          <div class="col-12 pb-4 px-5">
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
                    <textarea class="form-control" name="s" id="s" rows="3"></textarea>
                  </div>
                  <span class="d-flex justify-content-between align-items-center">
                    <div class="mb-3">
                      <label for="imgUrl" class="form-label"><small>[Optional]</small> Add an image:</label>
                      <input class="form-control" type="url" name="imgUrl" id="imgUrl">
                    </div>
                    <button class="btn btn-success" type="submit">Create Post</button>
                  </span>
                </form>
              </div>
            </section>
          </div>

          <hr>

        </section>
        <section class="row justify-content-end">
          <div v-if="currentPage.totalPages > 1"
            class="col-12 col-lg-9 d-flex justify-content-between align-items-center px-5">
            <Pagination />
          </div>
          <div v-for="post in posts" :key="post.id" class="col-12 col-lg-9">
            <PostCard :post="post" />
          </div>
        </section>
      </div>

      <div class="col-12 col-lg-2">
        <img v-for="ad in ads" :key="ad.title" :src="ad.tall" :alt="ad.title" :href="ad.linkUrl" class="my-2 img-fluid">
      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";
import { adsService } from "../services/AdsService";

export default {
  setup() {
    async function _getPostsAndAds() {
      try {
        await postsService.getPosts();
        await adsService.getAds();
        // await adsService.getAdsByCount(4);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      _getPostsAndAds();
    });
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads)
    };
  },
  components: { Pagination, PostCard }
}
</script>

<style scoped lang="scss">
.postingAs img {
  width: 5rem;
}

.listPosts {
  height: 93vh;
  overflow-y: scroll;
}
</style>
