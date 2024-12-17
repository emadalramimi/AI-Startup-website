import { SvgIconComponent } from '@mui/icons-material';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name: string;
  client_industry: string;
  challenge: string;
  solution: string;
  results: string;
  image?: string;
  order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  linkedin_url?: string;
  twitter_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
  is_read?: boolean;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: number;
    username: string;
    email?: string;
  } | null;
  loading: boolean;
  error: string | null;
}
