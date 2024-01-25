
import apiClient from "../api-client/apiClient";

class DepartmentService {
  static getDepartmentList () {
    return apiClient.get('/department')
  }
}
export default DepartmentService;