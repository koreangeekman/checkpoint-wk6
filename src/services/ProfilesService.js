import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { Profile } from "../models/Profile";
import { api } from "./AxiosService";

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`);
    AppState.currentProfile = new Profile(res.data);
  }

  async getPostsByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`);
    AppState.posts = res.data.posts.map(post => new Post(post));
  }

  async getProfilesByQuery(query) {
    const res = await api.get(`api/profiles?query=${query}`);
    AppState.profiles = res.data.map(profile => new Profile(profile));
  }

}

export const profilesService = new ProfilesService();