import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { GraduationCap } from 'lucide-react';

export default function Signup() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("src/components/image/ackg.jpg")',
      }}
    >
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <img 
            src="src/components/image/logonew.png" 
            alt="Extion Logo" 
            className="w-24 h-34 mb-4"
          />
          <h1 className="text-3xl font-bold text-purple-600">Extion Examinations</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

        <AuthForm type="signup" />

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}