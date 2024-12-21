export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  course: string;
  role: 'student' | 'instructor';
}

export interface AuthError {
  message: string;
}