import { defineStore } from 'pinia'
import ApiService from '../composables/apiService'
import { jwtDecode } from 'jwt-decode'

const rolesMapping = {
  901: 'committee',
  902: 'admin',
  904: 'student'
}

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

          this.setCookie('token', token, expirationDate)

          this.setUserId(decodedToken.preferred_username)
          this.setUserRole(decodedToken.groupid)
        }
      } catch (err) {
        this.setLoggedIn(false)
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

    setUserRole(groupId) {
      this.userRole = rolesMapping[groupId] || null;
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
        const studentId = decodedToken.preferred_username
        const groupId = decodedToken.groupid
    
        this.setLoggedIn(true)
        this.setUserId(studentId)
        this.setUserRole(groupId)
      } else {
        
        this.setLoggedIn(false)
        this.setUserId(null)
        this.setUserRole(null)
      }
    },
    
  },
})
