import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success('Password reset link sent to your email');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-purple-600">Reset Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-600 drop-shadow-md" />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md bg-white/80 backdrop-blur-sm"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-400 text-white py-3 rounded-xl hover:bg-purple-500 transition-colors shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}