import axios from 'axios';

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: 'http://172.26.116.30:3000',  // chạy máy thật thay địa chỉ IP WF
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json', 
    Accept: 'application/json', 
  },
});

// Thêm interceptor để xử lý request
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
