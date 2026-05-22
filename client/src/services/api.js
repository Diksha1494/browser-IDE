import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5001/api/projects",
});



export async function createProject(payload) {
  const response = await API.post("/projects", payload);
  return response.data;
}

export async function loadProject(id) {
  const response = await API.get(`/projects/${id}`);
  return response.data;
}

export async function updateProject(id, payload) {
  const response = await API.put(`/projects/${id}`, payload);
  return response.data;
}

export async function deleteProject(id) {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
}

export default API;
