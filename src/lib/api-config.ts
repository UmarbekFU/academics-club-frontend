/**
 * API Configuration
 * This file centralizes all API endpoint URLs for easy management
 */

// Backend API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API Endpoints
export const API_ENDPOINTS = {
  // Admin
  admin: {
    login: `${API_BASE_URL}/api/admin/login`,
    logout: `${API_BASE_URL}/api/admin/logout`,
    applications: `${API_BASE_URL}/api/admin/applications`,
  },
  
  // Applications
  applications: {
    create: `${API_BASE_URL}/api/applications`,
    getById: (id: string) => `${API_BASE_URL}/api/applications/${id}`,
  },
  
  // Blog
  blog: {
    list: `${API_BASE_URL}/api/blog`,
    getBySlug: (slug: string) => `${API_BASE_URL}/api/blog/${slug}`,
  },
  
  // Newsletter
  newsletter: {
    subscribe: `${API_BASE_URL}/api/newsletter`,
    unsubscribe: `${API_BASE_URL}/api/newsletter`,
  },
  
  // Programs
  programs: {
    list: `${API_BASE_URL}/api/programs`,
  },
  
  // Team
  team: {
    list: `${API_BASE_URL}/api/team`,
  },
  
  // Search
  search: {
    query: `${API_BASE_URL}/api/search`,
  },
  
  // Health Check
  health: `${API_BASE_URL}/health`,
};

// Fetch with credentials (for cookies)
export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default API_ENDPOINTS;
