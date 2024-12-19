import axios from 'axios';
import { TeamMember, Service, CaseStudy } from '../types';

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
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Define pagination response type
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Team Members API Methods
export const fetchTeamMembersAPI = () => {
  return api.get<PaginatedResponse<TeamMember>>('/team/');
};

export const addTeamMemberAPI = (memberData: FormData) => {
  return api.post<TeamMember>('/team/', memberData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateTeamMemberAPI = (id: number, memberData: FormData) => {
  // Convert FormData to object for inspection
  const formDataObj = {};
  memberData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  console.log('Updating team member with data:', formDataObj);

  return api.patch<TeamMember>(`/team/${id}/`, memberData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteTeamMemberAPI = (id: number) => {
  return api.delete(`/team/${id}/`);
};

// Auth API Methods
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/token/', {
      username,
      password,
    });

    if (response.data?.access) {
      localStorage.setItem('token', response.data.access);
      return response.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Invalid credentials');
    }
    throw error;
  }
};

// Services API Methods
export const getServices = () => {
  return api.get<Service[]>('/services/');
};

export const createService = (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
  return api.post<Service>('/services/', data);
};

export const updateService = (id: number, data: any) => {
  return api.patch<Service>(`/services/${id}/`, data);
};

export const deleteService = (id: number) => {
  return api.delete(`/services/${id}/`);
};

// Case Studies API Methods
export const getCaseStudies = () => {
  return api.get<PaginatedResponse<CaseStudy>>('/case-studies/');
};

export const createCaseStudy = (data: FormData) => {
  return api.post<CaseStudy>('/case-studies/', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateCaseStudy = (id: number, data: FormData) => {
  return api.patch<CaseStudy>(`/case-studies/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteCaseStudy = (id: number) => {
  return api.delete(`/case-studies/${id}/`);
};

export const getCaseStudy = (id: number) => {
  return api.get<CaseStudy>(`/case-studies/${id}/`);
};

// Contact Form API Methods
export const submitContactForm = (data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) => {
  return api.post('/contact/', data);
};
