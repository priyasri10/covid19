import http from "../http-common";

class DoctorDataService {
  getAll(params) {
    return http.get("/doctors", { params });
  }

  get(id) {
    return http.get(`/doctors/${id}`);
  }

  create(data) {
    return http.post("/doctors", data);
  }

  update(id, data) {
    return http.put(`/doctors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/doctors/${id}`);
  }

  deleteAll() {
    return http.delete("/doctors");
  }
}

export default new DoctorDataService();
