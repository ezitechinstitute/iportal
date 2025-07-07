import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/affiliate';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('affiliateToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('affiliateToken');
      localStorage.removeItem('affiliateData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- EXPORTS NEEDED BY YOUR APP ---

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
};

export const affiliateAPI = {
  getDashboardStats: () => api.get('/dashboard'),
  getReferredInterns: (params) => api.get('/interns', { params }),
  getEarningsHistory: (params) => api.get('/earnings', { params }),
  updateProfile: (data) => api.put('/profile', data),
  // Add more as needed...
};

export default api; 