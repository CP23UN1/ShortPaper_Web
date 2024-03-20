import { defineStore } from 'pinia'
import ApiService from '../composables/apiService'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    userRole: null,
  }),

  actions: {
    async login(info) {
      try {
        const response = await ApiService.login(info)

        if (response.status === 200) {
          this.setLoggedIn(true)
          const token = response.data.token
          const decodedToken = jwtDecode(token)

          const expirationTimestamp = decodedToken.exp * 1000
          const expirationDate = new Date(expirationTimestamp)

          console.log('expirationDate', expirationDate)

          this.setCookie('token', token, expirationDate)

          this.setUserId(decodedToken.nameid)
          this.setUserRole(decodedToken.role)
        }
      } catch (err) {
        console.error(err)
      }
    },
    logout() {
      this.setLoggedIn(false)
      this.deleteCookie('token')
      this.setUserId(null)
      this.setUserRole(null)
    },

    setLoggedIn(value) {
      this.isLoggedIn = value
    },

    setUserId(userId) {
      this.userId = userId
    },

    setUserRole(role) {
      this.userRole = role
    },

    setCookie(name, value, expirationDate) {
      const cookieValue =
        encodeURIComponent(value) +
        (expirationDate ? `; expires=${expirationDate.toUTCString()}` : '')
      document.cookie = `${name}=${cookieValue}; path=/`
    },

    deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    },

    getCookie(name) {
      const cookieName = `${name}=`
      const cookies = document.cookie.split(';')

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim()

        if (cookie.startsWith(cookieName)) {
          return decodeURIComponent(cookie.substring(cookieName.length))
        }
      }

      return null
    },

    async initializeAuthState() {
      const storedToken = this.getCookie('token')
      
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken)
        const studentId = decodedToken.nameid
        const role = decodedToken.role
    
        this.setLoggedIn(true)
        this.setUserId(studentId)
        this.setUserRole(role)
      } else {
        
        this.setLoggedIn(false)
        this.setUserId(null)
        this.setUserRole(null)
      }
    },
    
  },
})
