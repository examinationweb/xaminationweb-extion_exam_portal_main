import React from 'react';
import { BookOpen } from 'lucide-react';

interface ExaminationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  course: string;
  userCourse: string;
  isVerified: boolean;
  onAttempt: () => void;
}

export default function ExaminationCard({
  title,
  description,
  imageUrl,
  course,
  userCourse,
  isVerified,
  onAttempt
}: ExaminationCardProps) {
  const canAttempt = isVerified && course === userCourse;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          onClick={onAttempt}
          disabled={!canAttempt}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg ${
            canAttempt
              ? 'bg-purple-400 text-white hover:bg-purple-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Attempt Now
        </button>
      </div>
    </div>
  );
}