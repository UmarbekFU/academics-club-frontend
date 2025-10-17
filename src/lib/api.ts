import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API calls
export const publicApi = {
  // Blog
  getBlogPosts: (params = {}) => api.get('/api/blog', { params }),
  getBlogPost: (slug: string) => api.get(`/api/blog/${slug}`),
  
  // Applications
  submitApplication: (data: ApplicationData) => api.post('/api/applications', data),
  
  // Newsletter
  subscribeNewsletter: (email: string) => api.post('/api/newsletter', { email }),
  
  // Team
  getTeamMembers: () => api.get('/api/team'),
  
  // Programs
  getPrograms: () => api.get('/api/programs'),
};

// Admin API calls
export const adminApi = {
  // Auth
  login: (credentials: { username: string; password: string }) => 
    api.post('/api/admin/login', credentials),
  logout: () => api.post('/api/admin/logout'),
  
  // Applications
  getApplications: () => api.get('/api/admin/applications'),
  getApplication: (id: string) => api.get(`/api/admin/applications/${id}`),
  updateApplication: (id: string, data: UpdateApplicationData) => 
    api.patch(`/api/admin/applications/${id}`, data),
  deleteApplication: (id: string) => api.delete(`/api/admin/applications/${id}`),
  
  // Blog (admin)
  createBlogPost: (data: BlogPostData) => api.post('/api/blog', data),
  updateBlogPost: (slug: string, data: BlogPostData) => 
    api.patch(`/api/blog/${slug}`, data),
  deleteBlogPost: (slug: string) => api.delete(`/api/blog/${slug}`),
};

export default api;
