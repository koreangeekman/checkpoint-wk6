<template>
  <span class="navbar-text px-md-3">
    <button class="btn btn-primary selectable text-uppercase" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="px-2 d-flex">
        <router-link :to="{ name: 'Account' }">
          <div class="btn btn-primary">
            Manage Account
          </div>
        </router-link>
        <div class="btn btn-danger text-white fw-bold mx-3 selectable" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .btn-danger {
//   // opacity: .75;
//   // background-color: rgba(255, 0, 0, 0.8);
// }
</style>
