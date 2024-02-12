import api from './api'

class ApiService {
  // Announcements
  async getAnnouncements() {
    return await api.get(`/announcements`)
  }
  async createAnnouncement(announcementData) {
    return await api.post(`/announcement/create`, announcementData)
  }
  async updateAnnouncement(announcementId, announcementData) {
    return await api.put(
      `/announcement/update/${announcementId}`,
      announcementData
    )
  }
  async deleteAnnouncement(announcementId) {
    return await api.delete(`/announcement/delete/${announcementId}`)
  }

  // Committees
  async getCommittees() {
    return await api.get(`/committees`)
  }
  async addCommittee(file) {
    return await api.post(`/add-from-csv`, file)
  }

  // File
  async getFiles() {
    return await api.get(`/files`)
  }
  async getFileByShortpaper(shortpaperId) {
    return await api.get(`/files/${shortpaperId}`)
  }
  async uploadFile(file) {
    return await api.post(`/upload`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  async downloadFile(fileId) {
    return await api.get(`/download/${fileId}`)
  }
  async getFileType() {
    return await api.get(`/filetype`)
  }
  async getFileById(studentId) {
    return await api.get(`/files/${studentId}`)
  }

  // Short Paper
  async getShortPapers() {
    return await api.get(`/shortpapers`)
  }
  async searchShortPapers(keyword) {
    return await api.get(`/shortpapers/${keyword}`)
  }

  // Students
  async getStudents() {
    return await api.get(`/students`)
  }
  async searchStudents(keyword) {
    return await api.get(`/students/${keyword}`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student/${studentId}`)
  }
  async createStudent(studentData) {
    return await api.post(`/student/create`, studentData)
  }
  async updateStudent(studentId, studentData) {
    return await api.patch(`/student/update/${studentId}`, studentData)
  }
  async deleteStudent(studentId) {
    return await api.delete(`/student/delete/${studentId}`)
  }

  // Subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
}
export default new ApiService()
