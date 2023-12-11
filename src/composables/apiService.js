import api from './api'

class ApiService {
  // users
  async getUsers() {
    return await api.get(`/users`)
  }
  async getStudents() {
    return await api.get(`/students`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student/${studentId}`)
  }
  async getUser(userId){
    return await api.get(`/user/${userId}`)
  }
  async updateStudent(studentId, newData){
    console.log('to here');
    
    return await api.put(`/user/update/student/${studentId}`, newData)
  }
  // subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
  async getSubject(subjectId){
    return await api.get(`/subject/${subjectId}`)
  }

  //announcements
  async getAnnouncement() {
    return await api.get(`/announcements`)
  }

  //Projects
  async getProjects() {
    return await api.get(`/projects`)
  }
  async getProject(){
    return await api.get(`/project`)
  }
  async addCommittee(){
    return await api.get(`/project/committee`)
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