import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '../composables/apiService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  
  actions: {
    async login(info) {
      try {
        const response = await ApiService.login(info)

        if (response.status === 200) {
          this.isLoggedIn = true
          console.log('success')
        }
      } catch (err) {
        console.error(err)
      }
    },
    logout() {
      this.isLoggedIn = false
    },
  },
})
