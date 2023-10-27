import { AppState } from "../AppState";
import { Ad } from "../models/Ad";
import { api } from "./AxiosService";

class AdsService {
  async getAds() {
    const res = await api.get('api/ads');
    AppState.ads = res.data.map(ad => new Ad(ad));
  }
  async getAdsByCount(count) {
    const res = await api.get(`api/ads?count=${count}`);
    AppState.ads = res.data.map(ad => new Ad(ad));
  }

}

export const adsService = new AdsService(); 