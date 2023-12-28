import api from './api'

class ApiService {
  // Users
  async getStudents() {
    return await api.get(`/students`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student/${studentId}`)
  }
  async createStudent(studentData) {
    return await api.post(`/student/create`, studentData)
  }
  async updateStudent(studentId, studentData) {
    return await api.put(`/student/update/${studentId}`, studentData)
  }
  async deleteStudent(studentId) {
    return await api.delete(`/student/delete/${studentId}`)
  }
  async searchStudent(keyword) {
    return await api.get(`/students/${keyword}`)
  }

  // Subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
  async getSubject(subjectId) {
    return await api.get(`/subject/${subjectId}`)
  }

  //Announcements
  async getAnnouncements() {
    return await api.get(`/announcements`)
  }

  //Committees
  async getCommittees() {
    return await api.get(`/committees`)
  }
  async addCommittee(committeeList) {
    return await api.post(`/project/committee`, committeeList)
  }
}
export default new ApiService()
