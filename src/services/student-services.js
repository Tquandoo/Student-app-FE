
import apiClient from "../api-client/apiClient";

class StudentService {
  static createStudent(data){
    return apiClient.post('/student', data)
  }
}
export default StudentService