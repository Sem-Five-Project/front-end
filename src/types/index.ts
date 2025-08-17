export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  userType: 'student' | 'tutor';
  isVerified: boolean;
  createdAt: string;
  profileImage?: string;
}

export interface Tutor extends User {
  subjects: string[];
  experience: number;
  rating: number;
  classCompletionRate: number;
  bio: string;
  hourlyRate: number;
  totalClasses: number;
  completedClasses: number;
}

export interface TimeSlot {
  id: string;
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'in_progress' | 'booked';
  price: number;
  lockExpiry?: string;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  slotId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  tutor: Tutor;
  slot: TimeSlot;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'student' | 'tutor';
}

export interface FilterOptions {
  search?: string;
  subjects?: string[];
  minRating?: number;
  maxPrice?: number;
  experience?: number;
  sortBy?: 'rating' | 'price' | 'experience' | 'completion_rate';
  sortOrder?: 'asc' | 'desc';
}