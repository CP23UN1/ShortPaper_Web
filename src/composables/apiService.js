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
  async getReplyComment(fileId, replyId) {
    return await api.get(`/comment/replycomment/${fileId}/${replyId}`)
  }
  async sendComment(comment) {
    return await api.post('/comment/create', comment)
  }
  async sendReplyComment(replycomment) {
    return await api.post(`/comment/create/replycomment`, replycomment)
  }

  // Committees
  async getCommittees() {
    return await api.get(`/committees`)
  }
  async getCommittee(id) {
    return await api.get(`/committee/${id}`)
  }
  async addCommittee(file) {
    return await api.post(`/committee/add-from-csv`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  async assignCommittee(file) {
    return await api.post('/committee/assign-from-csv-for-student', file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  async updateCommitteeRolesForStudentAsync(studentId, committeeRoles) {
    return await api.post(
      `committee/update-roles-for-student/${studentId}`,
      committeeRoles
    )
  }

  // File
  async getFileByShortpaper(shortpaperId) {
    return await api.get(`/files/${shortpaperId}`)
  }
  async uploadFile(file) {
    return await api.post(`/file/upload`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  async downloadFile(shortpaperId, fileTypeId) {
    return await api.get(`/file/download/${shortpaperId}/${fileTypeId}`, {
      responseType: 'blob',
    })
  }
  async getFileType() {
    return await api.get(`/filetype`)
  }
  async getFiles() {
    return await api.get(`/files`)
  }
  async getFilesByStudent(studentId) {
    return await api.get(`/file/search-by-student/${studentId}`)
  }
  async getFileByIdAndStudent(fileId, studentId) {
    return await api.get(
      `/file/search-by-id-and-student/${fileId}/${studentId}`
    )
  }
  async getFilesByCommittee(committeeId) {
    return await api.get(`/file/search-by-committee-id/${committeeId}`)
  }
  async getFilebyFiletypeAndShortpaper(fileTypeId, shortPaperId) {
    return await api.get(
      `/file/fileType/Shortpaper/${fileTypeId}/${shortPaperId}`
    )
  }
  async updateFileStatus(fileId) {
    return await api.put(`/file/update/status/${fileId}`)
  }
  async dashboardData(){
return await api.get(`/studentFileStatus`)
  }

  // Short Paper
  async getShortPapers() {
    return await api.get(`/shortpapers`)
  }
  async getShortPaper(studentId) {
    return await api.get(`/shortpaper/search-by-student/${studentId}`)
  }
  async searchShortPapers(keyword) {
    return await api.get(`/shortpaper/search-by-filter/${keyword}`)
  }
  async addShortpaper(shortpaper) {
    return await api.post(`/shortpaper/create`, shortpaper)
  }
  async updateShortpaper(shortpaperId, shortpaper) {
    return await api.patch(`/shortpaper/update/${shortpaperId}`, shortpaper)
  }

  // Students
  async getStudents() {
    return await api.get(`/students`)
  }
  async searchStudents(keyword) {
    return await api.get(`/student/search-by-filter/${keyword}`)
  }
  async getStudentById(studentId) {
    return await api.get(`/student/search-by-id/${studentId}`)
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
  async addStudent(file) {
      return await api.post('/student/add-from-csv', file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
  }
  async getStudentByCommittee(committeeId) {
    return await api.get(`/student/committee/${committeeId}`)
  }
  async getStudentByCommitteeAndFilter(committeeId, filter) {
    return await api.get(`/student/committee-filter/${committeeId}/${filter}`)
  }

  // Subjects
  async getSubjects() {
    return await api.get(`/subjects`)
  }
  async searchSubjects(keyword) {
    return await api.get(`/subjects/search-by-filter/${keyword}`)
  }
  async updateSubject(studentId, subject) {
    return await api.patch(`/subject/update/${studentId}`, subject)
  }
  // Article
  async getArticles() {
    return await api.get(`/articles`)
  }
}
export default new ApiService()
