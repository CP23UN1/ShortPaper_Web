import api from './api'

class ApiService {
  // Users
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
    return await api.put(`/user/update/student/${studentId}`, newData)
  }
  // Subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
  async getSubject(subjectId){
    return await api.get(`/subject/${subjectId}`)
  }

  //Announcements
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
}
export default new ApiService()