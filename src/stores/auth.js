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
          this.setLoggedIn(true)
          // expire in 7 days
          this.setCookie('token', response.data.token, 7)
        }
      } catch (err) {
        console.error(err)
      }
    },
    logout() {
      this.setLoggedIn(false)
      this.deleteCookie('token')
    },

    setLoggedIn(value) {
      this.isLoggedIn = value
    },

    setCookie(name, value, days) {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      const cookieValue =
        encodeURIComponent(value) +
        (expires ? `; expires=${expires.toUTCString()}` : '')
      document.cookie = `${name}=${cookieValue}; path=/`
    },
    deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    },
  },
})
