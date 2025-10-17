import type { TLogin } from "../../types/auth";
import axiosInstance from "../axiosInstance";

const api_url = "/auth";
const AuthService = {
  login(payload: TLogin) {
    return axiosInstance.post(`${api_url}/login`, payload);
  },
  getModuleMenu() {
    return axiosInstance.get(`${api_url}/get-modules-menus`);
  },
};

export default AuthService;
