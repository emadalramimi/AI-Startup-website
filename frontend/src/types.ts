// Team Member Types
export interface TeamMember {
  id?: number;
  name: string;
  position: string;
  bio: string;
  image?: File | string;
  linkedin_url?: string;
  github_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Service Types
export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

// Case Study Types
export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  details?: Record<string, string[]>;
}
