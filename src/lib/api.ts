import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Type definitions
interface ApplicationData {
  name: string;
  email: string;
  phone?: string;
  program: string;
  message?: string;
}

interface BlogPostData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published?: boolean;
}

interface UpdateApplicationData {
  status?: string;
  message?: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API calls
export const publicApi = {
  // Blog
  getBlogPosts: (params = {}) => api.get('/public/blog', { params }),
  getBlogPost: (slug: string) => api.get(`/public/blog/${slug}`),
  
  // Applications
  submitApplication: (data: ApplicationData) => api.post('/auth/applications', data),
  
  // Newsletter
  subscribeNewsletter: (email: string) => api.post('/auth/newsletter', { email }),
  
  // Team
  getTeamMembers: () => api.get('/auth/team'),
  
  // Programs
  getPrograms: () => api.get('/auth/programs'),
};

// Admin API calls
export const adminApi = {
  // Auth
  login: (credentials: { username: string; password: string }) => 
    api.post('/admin/login', credentials),
  
  // Applications
  getApplications: () => api.get('/admin/applications'),
  getApplication: (id: string) => api.get(`/admin/applications/${id}`),
  updateApplication: (id: string, data: UpdateApplicationData) => 
    api.patch(`/admin/applications/${id}`, data),
  deleteApplication: (id: string) => api.delete(`/admin/applications/${id}`),
  
  // Blog (admin)
  createBlogPost: (data: BlogPostData) => api.post('/public/blog', data),
  updateBlogPost: (slug: string, data: BlogPostData) => 
    api.patch(`/public/blog/${slug}`, data),
  deleteBlogPost: (slug: string) => api.delete(`/public/blog/${slug}`),
};

export default api;
