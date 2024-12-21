import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const courses = [
  'Cybersecurity',
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Cloud Computing'
];

interface InstructorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export default function InstructorProfileModal({
  isOpen,
  onClose,
  onUpdate
}: InstructorProfileModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: courses[0],
    profileImage: null as File | null
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Instructor Profile</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-gray-600">Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, profileImage: file });
                }}
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full p-3 border rounded-lg"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <button
            onClick={() => onUpdate(formData)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}