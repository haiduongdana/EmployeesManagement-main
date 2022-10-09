import axios from "axios";

const API_URL = `${
  process.env.REACT_APP_BASE_URL || "http://localhost:8080"
}/employee`;

const getAll = (params) => {
  return axios.get(API_URL, { params });
};

const getOne = (id) => {
  return axios.get(API_URL + "/" + id);
};

const create = (data) => {
  return axios.post(API_URL, data);
};

const update = (data, id) => {
  return axios.put(API_URL + "/" + id, data);
};

const destroy = (id) => {
  return axios.delete(API_URL + "/" + id);
};

const EmployeeService = {
  getAll,
  getOne,
  create,
  update,
  destroy,
};

export default EmployeeService;
