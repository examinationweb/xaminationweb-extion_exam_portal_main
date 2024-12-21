import React from 'react';
import { Navigate } from 'react-router-dom';

interface InstructorRouteProps {
  children: React.ReactNode;
}

export default function InstructorRoute({ children }: InstructorRouteProps) {
  const instructor = localStorage.getItem('instructor');

  if (!instructor) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}