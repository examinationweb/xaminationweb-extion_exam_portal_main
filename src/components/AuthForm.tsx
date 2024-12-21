import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, Phone, BookOpen, Cake } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CountryCodeSelect from './CountryCodeSelect';
import { instructors } from '../data/instructors';

interface AuthFormProps {
  type: 'login' | 'signup' | 'instructor';
}

const iconClasses = "w-5 h-5 text-purple-600 drop-shadow-md";
const inputClasses = "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md bg-white/80 backdrop-blur-sm";

export default function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    countryCode: '+91',
    phone: '',
    course: 'cybersecurity',
    password: '',
    confirmPassword: '',
    instructorId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'signup' && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      if (type === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              dateOfBirth: formData.dateOfBirth,
              phone: `${formData.countryCode}${formData.phone}`,
              course: formData.course,
              role: 'student',
            },
          },
        });

        if (error) throw error;

        toast.success('Successfully registered! Please check your email for verification.');
        navigate('/login');
      } else if (type === 'instructor') {
        const instructor = instructors.find(
          (inst) => inst.id === formData.instructorId && inst.password === formData.password
        );

        if (!instructor) {
          toast.error('Invalid Instructor ID or Password!');
          return;
        }

        localStorage.setItem('instructor', JSON.stringify(instructor));
        toast.success('Login successful!');
        navigate('/instructor-dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {type === 'signup' && (
        <>
          <div>
            <label className="flex items-center gap-2">
              <User className={iconClasses} />
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Cake className={iconClasses} />
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className={inputClasses}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <Phone className={iconClasses} />
              <div className="flex gap-2 flex-1">
                <CountryCodeSelect
                  value={formData.countryCode}
                  onChange={(value) => setFormData({ ...formData, countryCode: value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`${inputClasses} flex-1`}
                />
              </div>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <BookOpen className={iconClasses} />
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className={inputClasses}
              >
                <option value="cybersecurity">Cybersecurity</option>
              </select>
            </label>
          </div>
        </>
      )}

      {type === 'instructor' ? (
        <div>
          <label className="flex items-center gap-2">
            <User className={iconClasses} />
            <input
              type="text"
              placeholder="Instructor ID"
              required
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
              className={inputClasses}
            />
          </label>
        </div>
      ) : (
        <div>
          <label className="flex items-center gap-2">
            <Mail className={iconClasses} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
            />
          </label>
        </div>
      )}

      <div>
        <label className="flex items-center gap-2">
          <Lock className={iconClasses} />
          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={inputClasses}
          />
        </label>
      </div>

      {type === 'signup' && (
        <div>
          <label className="flex items-center gap-2">
            <Lock className={iconClasses} />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputClasses}
            />
          </label>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-purple-400 text-white py-3 rounded-xl hover:bg-purple-500 transition-colors shadow-md"
      >
        {type === 'signup' ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
}