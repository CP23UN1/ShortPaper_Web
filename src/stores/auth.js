import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    login() {
      // Logic to handle login
    },
    logout() {
      // Logic to handle logout
    },
  },
})
