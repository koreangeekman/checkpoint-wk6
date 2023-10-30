import { api } from "./AxiosService";
import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { logger } from "../utils/Logger";
import { CurrentPage } from "../models/CurrentPage";

class PostsService {

  async getPosts() {
    const res = await api.get('api/posts');
    AppState.posts = res.data.posts.map(post => new Post(post));
    AppState.currentPage = new CurrentPage(res.data);
  }

  async getPostById(postId) {
    const res = await api.get(`api/posts/${postId}`);
    AppState.activePost = new Post(res.data);
  }

  async getPostsByPage(pageUrl) {
    AppState.searching = true;
    const res = await api.get(pageUrl);
    AppState.posts = res.data.posts.map(post => new Post(post));
    AppState.searching = false;
    AppState.currentPage = new CurrentPage(res.data);
    // logger.log('[POSTS SERVICE] getPostsByPage(): ', AppState.currentPage, 'posts', AppState.posts);
  }

  async getPostsByQuery(query) {
    AppState.searching = true;
    const res = await api.get(`api/posts?query=${query}`);
    AppState.posts = res.data.posts.map(post => new Post(post));
    AppState.searching = false;
    AppState.currentPage = new CurrentPage(res.data);
  }

  clearData() {
    AppState.posts = [];
    AppState.activePost = null;
    AppState.currentPage = {};
  }

  // 🔽 AUTHENTICATION REQUIRED BELOW 🔽

  async createPost(postBody) {
    const res = await api.post('api/posts', postBody);
    AppState.posts.unshift(new Post(res.data));
    logger.log('[POSTS SERVICE] createPost(): ', AppState.posts[0]);
  }

  async toggleLike(postId) {
    const res = await api.post(`api/posts/${postId}/like`);
    logger.log('[POSTS SERVICE] toggleLike(): ', res.data);
    return res.data
  }

  async updatePost(postId, postBody) {
    const res = await api.put(`api/posts/${postId}`, postBody)
    const toBeUpdatedIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(toBeUpdatedIndex, 1, new Post(res.data))
    logger.log('[POSTS SERVICE] updatePost(): ', AppState.posts[toBeUpdatedIndex])
  }

  async removePost(postId) {
    const toBeDeletedIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(toBeDeletedIndex, 1)
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('[POSTS SERVICE] removePost(): ', res.data, '::', postId)
  }

}

export const postsService = new PostsService();