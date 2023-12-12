import api from './api'

class ApiService {
  // Users
  async getStudents() {
    return await api.get(`/students`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student/${studentId}`)
  }
  async updateStudent(studentId, newData){
    return await api.put(`/user/update/student/${studentId}`, newData)
  }

  async searchStudent(keyword){
    return await api.get(`/user/student/${keyword}`)
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
  async addCommittee(committeeList){
    return await api.post(`/project/committee`, committeeList)
  }
}
export default new ApiService()