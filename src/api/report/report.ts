import axiosInstance from "../axiosInstance";

const api_url = "/report";
const ReportService = {
  getReport() {
    return axiosInstance.post(`${api_url}/get-report`);
  },
};

export default ReportService;
