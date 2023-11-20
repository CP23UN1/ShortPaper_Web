import api from './api'

class ApiService {
  // users
  async getUsers() {
    return await api.get(`/users`)
  }
  async getUser(userId){
    return await api.get(`/user/${userId}`)
  }
  // subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
  async getSubject(subjectId){
    return await api.get(`/subject/${subjectId}`)
  }

  //   get(id: any) {
  //     return api.get(`/products/${id}`)
  //   }
  //   create(data) {
  //     return api.post('/tutorials', data)
  //   }
  // update(id, data) {
  //   return api.put(`/tutorials/${id}`, data)
  // }
  //   delete(id) {
  //     return api.delete(`/tutorials/${id}`)
  //   }
  //   deleteAll() {
  //     return api.delete(`/tutorials`)
  //   }
  //   findByTitle(title) {
  //     return api.get(`/tutorials?title=${title}`)
  //   }
}
export default new ApiService()