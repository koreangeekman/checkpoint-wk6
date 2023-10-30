import { AppState } from "../AppState";
import { Ad } from "../models/Ad";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService";

class AdsService {
  async getAds() {
    if (AppState.adsPending) { return }
    AppState.adsPending = true;
    const res = await api.get('api/ads');
    AppState.ads = res.data.map(ad => new Ad(ad));
    // logger.log('[ADS SERVICE] getAds(): ', AppState.ads);
  }

  async getAdsByCount(count) {
    const res = await api.get(`api/ads?count=${count}`);
    AppState.ads = res.data.map(ad => new Ad(ad));
  }

  clearPending() {
    AppState.adsPending = false;
  }

}

export const adsService = new AdsService(); 