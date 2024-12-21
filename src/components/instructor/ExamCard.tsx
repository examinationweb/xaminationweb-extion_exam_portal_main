import React from 'react';
import { Edit2, Eye, Video, Trash2 } from 'lucide-react';

interface ExamCardProps {
  exam: {
    name: string;
    totalMarks: string;
    numberOfQuestions: string;
    code: string;
    meetLink: string;
  };
  onEdit: () => void;
  onShowCode: () => void;
  onDelete: () => void;
}

export default function ExamCard({ exam, onEdit, onShowCode, onDelete }: ExamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{exam.name}</h3>
      
      <div className="space-y-2 mb-4">
        <p>Total Marks: {exam.totalMarks}</p>
        <p>Questions: {exam.numberOfQuestions}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Edit2 className="w-4 h-4" />
          Edit Questions
        </button>

        <button
          onClick={onShowCode}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <Eye className="w-4 h-4" />
          Show Code
        </button>

        <a
          href={exam.meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Video className="w-4 h-4" />
          Join Meet
        </a>

        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" />
          Delete Examination
        </button>
      </div>
    </div>
  );
}