import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const [isInstructor, setIsInstructor] = React.useState(false);

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
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-bold text-purple-600">Extion Examinations</h1>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsInstructor(false)}
            className={`px-4 py-2 rounded-l-lg ${
              !isInstructor 
                ? 'bg-purple-400 text-white' 
                : 'bg-gray-100 text-gray-600'
            } transition-colors`}
          >
            Student
          </button>
          <button
            onClick={() => setIsInstructor(true)}
            className={`px-4 py-2 rounded-r-lg ${
              isInstructor 
                ? 'bg-purple-400 text-white' 
                : 'bg-gray-100 text-gray-600'
            } transition-colors`}
          >
            Instructor
          </button>
        </div>
        
        <AuthForm type={isInstructor ? 'instructor' : 'login'} />

        {!isInstructor && (
          <div className="mt-4 text-center text-gray-600 space-y-2">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign up now!
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}