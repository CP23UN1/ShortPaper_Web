import { defineStore } from 'pinia'

export const useValidateStore = defineStore('validate', {
  state: () => ({}),

  actions: {
    validateEmail(email) {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      if (email.match(validRegex)) {
        return true
      } else {
        return false
      }
    },
  },
})
