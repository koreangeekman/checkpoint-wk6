import { AppState } from "../AppState";
import { CurrentPage } from "../models/CurrentPage.js";
import { Profile } from "../models/Profile";
import { Post } from "../models/Post";
import { api } from "./AxiosService";

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`);
    AppState.activeProfile = new Profile(res.data);
  }

  async getPostsByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`);
    AppState.posts = res.data.posts.map(post => new Post(post));
    AppState.currentPage = new CurrentPage(res.data);
  }

  async getProfilesByQuery(query) {
    const res = await api.get(`api/profiles?query=${query}`);
    AppState.profiles = res.data.map(profile => new Profile(profile));
  }

}

export const profilesService = new ProfilesService();