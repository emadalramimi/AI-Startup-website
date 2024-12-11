import axios from 'axios';
import { TeamMember, Service } from '../types';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Team Members API Methods
export const fetchTeamMembersAPI = () => {
  return api.get<TeamMember[]>('/team/');
};

export const addTeamMemberAPI = (memberData: Omit<TeamMember, 'id'>) => {
  return api.post<TeamMember>('/team/', memberData);
};

export const updateTeamMemberAPI = (id: number, memberData: Partial<TeamMember>) => {
  return api.patch<TeamMember>(`/team/${id}/`, memberData);
};

export const deleteTeamMemberAPI = (id: number) => {
  return api.delete(`/team/${id}/`);
};

// Existing API methods for other resources
export const loginUser = async (username: string, password: string) => {
  const response = await api.post('/token/', { username, password });
  return response.data;
};

export const getServices = async () => {
  const response = await api.get('/services/');
  return response.data;
};

export const createService = async (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await api.post<Service>('/services/', data);
    return response.data;
  } catch (error: any) {
    console.error('Create service API error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error;
  }
};

export const updateService = async (id: number, data: any) => {
  const response = await api.patch(`/services/${id}/`, data);
  return response.data;
};

export const deleteService = async (id: number) => {
  const response = await api.delete(`/services/${id}/`);
  return response.data;
};

// Similar methods for other resources can be added here
export const getCaseStudies = async () => {
  const response = await api.get('/case-studies/');
  return response.data;
};

export const createCaseStudy = async (data: any) => {
  const response = await api.post('/case-studies/', data);
  return response.data;
};

export const updateCaseStudy = async (id: number, data: any) => {
  const response = await api.patch(`/case-studies/${id}/`, data);
  return response.data;
};

export const deleteCaseStudy = async (id: number) => {
  const response = await api.delete(`/case-studies/${id}/`);
  return response.data;
};

export const getCaseStudy = async (id: number) => {
  const response = await api.get(`/case-studies/${id}/`);
  return response.data;
};

export const submitContactForm = async (data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) => {
  const response = await api.post('/contact/', data);
  return response.data;
};
