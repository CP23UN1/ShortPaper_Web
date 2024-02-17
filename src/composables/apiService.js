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

  // Auth
  async login(info) {
    return await api.post('/login', info)
  }

  // Comments
  async getComments(fileId) {
    return await api.get(`/comments/${fileId}`)
  }
  async addComment(comment) {
    return await api.post('/add-comment', comment)
  }

  // Committees
  async getCommittees() {
    return await api.get(`/committees`)
  }
  async addCommittee(file) {
    return await api.post(`/add-from-csv`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  async assignCommittee(file) {
    return await api.post(`/assign-from-csv-for-student`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  // File
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
  async getFiles() {
    return await api.get(`/files`)
  }
  async getFilesByStudent(studentId) {
    return await api.get(`/file-by-student/${studentId}`)
  }
  async getFileByTypeAndStudent(typeId, studentId) {
    return await api.get(`/file-by-id-and-student/${typeId}/${studentId}`)
  }

  // Short Paper
  async getShortPapers() {
    return await api.get(`/shortpapers`)
  }
  async searchShortPapers(keyword) {
    return await api.get(`/shortpaper-by-filter/${keyword}`)
  }

  // Students
  async getStudents() {
    return await api.get(`/students`)
  }
  async searchStudents(keyword) {
    return await api.get(`/students-by-filter/${keyword}`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student-by-id/${studentId}`)
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
  async searchSubjects(keyword) {
    return await api.get(`/subjects-by-filter/${keyword}`)
  }
}
export default new ApiService()
